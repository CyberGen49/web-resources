
function showMenu(e) {
    e.preventDefault();
    let entries = [{
        type: 'item',
        name: `Playback speed...`,
        icon: 'speed',
        action: () => {
            let speeds = [0.1, 0.25, 0.5, 0.75, 1, 1.1, 1.25, 1.5, 1.75, 2, 3, 5];
            let items = [];
            speeds.forEach((speed) => {
                items.push({
                    type: 'item',
                    name: `${(speed == 1) ? 'Default':`${speed}x`} speed`,
                    action: () => {
                        vid.playbackRate = speed;
                    }
                });
            });
            showContext(items);
        }
    }, { type: 'sep' }, {
        type: 'item',
        name: `Copy video source URL`,
        icon: 'content_copy',
        action: () => copyText(vid.src)
    }, {
        type: 'item',
        name: `Copy player URL`,
        icon: 'content_copy',
        action: () => copyText(window.location.href)
    }];
    if (window.self !== window.top) {
        entries.push(
            { type: 'sep' }, {
                type: 'item',
                name: 'Open player in new tab',
                icon: 'open_in_new',
                action: () => window.open(window.location.href, '_blank')
            }
        )
    }
    showContext(entries);
};
const isVideoPlaying = video => !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);

window.addEventListener('load', () => {
    const vid = _id('vid');
    const updateTime = () => {
        _id('prog').value = vid.currentTime;
        _id('progFill').value = vid.currentTime;
        _id('progTime').innerText = formatSeconds(vid.currentTime);
        _id('duration').innerText = formatSeconds(vid.duration);
        const buffers = vid.buffered;
        const duration = vid.duration;
        _id('buffers').innerHTML = '';
        for (let i = 0; i < buffers.length; i++) {
            const start = buffers.start(i);
            const end = buffers.end(i);
            const left = (start/duration)*100;
            const width = ((end-start)/duration)*100;
            //console.log(`Buffer:`, left, width);
            if (width > 1)
                _id('buffers').insertAdjacentHTML('beforeend', `
                    <progress class="buffer" style="left: ${left}%; width: ${width}%" min="0" max="1" value="0"></progress>
                `);
        }
    }
    const updateSpeed = () => {
        _id('speedCont').classList.add('hidden');
        if (vid.playbackRate !== 1) {
            _id('speedCont').classList.remove('hidden');
            _id('speed').innerText = `${vid.playbackRate}x`;
        }
    }
    let isWaiting = false;
    setInterval(() => {
        const isDownloading = vid.networkState === vid.NETWORK_LOADING;
        const isWaitingForData = vid.readyState < vid.HAVE_FUTURE_DATA;
        if (!vid.paused && (isWaiting || isDownloading || isWaitingForData)) {
            _id('bufferSpinner').classList.add('visible');
        } else {
            _id('bufferSpinner').classList.remove('visible');
        }
    }, 1000);
    let hideControlsTimeout;
    let areControlsVisible = true;
    const showControls = () => {
        _id('controls').classList.add('visible');
        areControlsVisible = true;
    }
    const hideControls = () => {
        _id('controls').classList.remove('visible');
        areControlsVisible = false;
    }
    const startHideControls = () => {
        clearTimeout(hideControlsTimeout);
        showControls();
        hideControlsTimeout = setTimeout(() => {
            if (isVideoPlaying(vid)) hideControls();
        }, 2000);
    }
    on(vid, 'loadedmetadata', () => {
        _id('progFill').max = vid.duration;
        _id('prog').max = vid.duration;
    });
    on(vid, 'canplay', () => {
        updateTime();
        updateSpeed();
    });
    on(vid, 'timeupdate', () => {
        updateTime();
    });
    on(vid, ['play', 'playing'], () => {
        _qs('#playPause .icon').classList.remove('old');
        _qs('#playPauseBig .icon').classList.remove('old');
        _qs('#playPause .icon').innerText = 'pause';
        _qs('#playPauseBig .icon').innerText = 'pause';
        startHideControls();
    });
    on(vid, 'playing', () => {
        isWaiting = false;
    });
    on(vid, 'waiting', () => {
        isWaiting = true;
    });
    on(vid, 'pause', () => {
        showControls();
        _qs('#playPause .icon').classList.add('old');
        _qs('#playPauseBig .icon').classList.add('old');
        _qs('#playPause .icon').innerText = 'play_arrow';
        _qs('#playPauseBig .icon').innerText = 'play_arrow';
    });
    on(vid, 'seeking', () => {
        startHideControls();
    });
    on(vid, 'seeked', () => {});
    on(vid, 'ratechange', () => {
        updateSpeed();
    });
    on(vid, 'error', (e) => {
        let msg = `An unknown error occurred while trying to play this video. Try downloading it instead.`;
        console.log(e);
        switch (e.code) {
            case 1: `The loading of this video was aborted.`; break;
            case 2: `A network error has occurred, preventing this video from playing.`; break;
            case 3: `Your browser is unable to decode this video. Download and play it on your device instead.`; break;
            case 4: `Your browser doesn't support this video format. Download and play it on your device instead.`; break;
        }
        showPopup(`Failed to play video`, msg, [{
            label: `Download`,
            primary: true,
            noClose: true,
            action: () => {
                downloadFile(vid.src);
            }
        }]);
    });
    on(_id('prog'), 'input', () => {
        const value = _id('prog').value;
        vid.currentTime = value;
        updateTime();
    });
    on(_id('menu'), 'click', showMenu);
    on(_id('download'), 'click', () => downloadFile(vid.src));
    on(_id('playPause'), 'click', () => {
        if (isVideoPlaying(vid)) vid.pause();
        else vid.play();
    });
    on(_id('back'), 'click', () => {
        vid.currentTime -= 10;
        updateTime();
    });
    on(_id('forward'), 'click', () => {
        vid.currentTime += 10;
        vid.currentTime -= 0.1;
        updateTime();
    });
    on(_id('fullscreen'), 'click', () => {
        if (document.fullscreenEnabled) {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        } else {
            showPopup(`Unable to enter fullscreen`, `Your browser isn't allowing this page to enter fullscreen.`, [{
                label: 'Okay',
                primary: true,
                escape: true
            }])
        }
    });
    on(document, 'fullscreenchange', () => {
        if (document.fullscreenElement) {
            _qs('#fullscreen .icon').innerText = 'fullscreen_exit';
            if (isNameOnlyFullscreen) _id('name').style.visibility = 'visible';
        } else {
            _qs('#fullscreen .icon').innerText = 'fullscreen';
            if (isNameOnlyFullscreen) _id('name').style.visibility = 'hidden';
        }
    })
    on(document.body, 'contextmenu', showMenu);
    on(window, 'keydown', (e) => {
        const cases = {
            Space: () => _id('playPause').click(),
            KeyF: () => _id('fullscreen').click(),
            ArrowLeft: () => _id('back').click(),
            ArrowRight: () => _id('forward').click(),
            NumpadAdd: () => {
                vid.playbackRate = roundSmart(clamp(vid.playbackRate+0.05, 0.1, 5), 2);
            },
            NumpadSubtract: () => {
                vid.playbackRate = roundSmart(clamp(vid.playbackRate-0.05, 0.1, 5), 2);
            }
        };
        try {
            startHideControls();
            cases[e.code]();
        } catch (error) {}
    });
    on(window, 'mousemove', () => {
        if (document.body.classList.contains('isTouch')) return;
        startHideControls();
    });
    on(window, 'mouseleave', () => {
        if (document.body.classList.contains('isTouch')) return;
        if (isVideoPlaying(vid)) hideControls();
    });
    on(document, 'click', () => {
        if (!document.body.classList.contains('isTouch'))
            _id('playPause').click();
        else {
            if (areControlsVisible) hideControls();
            else startHideControls();
        }
    });
    if (params.get('autoplay')) vid.autoplay = true;
    vid.src = params.get('url');
    console.log(vid.src);
    const videoName = params.get('name') || params.get('url').split('?')[0].split('/').reverse()[0];
    const isNameOnlyFullscreen = params.get('nameOnlyFullscreen') ? true : false;
    _id('name').style.visibility = 'hidden';
    _id('name').innerText = videoName;
    document.title = videoName;
    if (params.get('hue')) {
        document.body.classList.add('changeColours');
        document.body.style.setProperty('--fgHue', params.get('hue'));
    }

    [..._tag('button')].forEach((el) => {
        on(el, 'click', (e) => {
            e.stopPropagation();
            e.target.blur();
        });
    });
});