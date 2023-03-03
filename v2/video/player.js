
window.addEventListener('load', () => {
    const url = params.get('url');
    const popup = new PopupBuilder()
        .setTitle('Unable to play video')
        .addBodyHTML(`<p>Something went wrong while trying to play the video located at <b>${url}</b>. Try reloading the player, or downloading the file instead.</p>`)
        .addAction(action => action
            .setLabel(`Reload`)
            .setIsPrimary(true)
            .setClickHandler(() => window.location.reload()))
        .addAction(action => action
            .setLabel(`Download`)
            .setClickHandler(() => promptUrlDownload(vid.src)))
        .setClickOutside(false);
    window.addEventListener('error', (e) => {
        console.error(e.error);
        popup.show();
    });
    // Get the title
    const urlParsed = new URL(url);
    const titleWithExt = params.get('title') || decodeURI(urlParsed.pathname).split('/').pop() || '';
    let tmp = titleWithExt.split('.');
    tmp.pop();
    const title = tmp;
    const elTitle = $('#title');
    // Show the title
    document.title = title;
    elTitle.innerText = title;
    // Get settings
    const titleOnlyFullscreen = !!params.get('titleOnlyFullscreen');
    if (!titleOnlyFullscreen) elTitle.style.opacity = 1;
    const shouldAutoplay = !!params.get('autoplay');
    const savedProgress = JSON.parse(window.localStorage.getItem('video_progress') || '{}');
    document.body.dataset.isEmbed = (window.top !== window);
    // Get elements
    const vid = $('#vid');
    const spinner = $('#spinner');
    const controls = $('#controls');
    const btnMenu = $('#btnMenu');
    const progress = $('#progress');
    const timeProgress = $('#timeProgress');
    const timeDuration = $('#timeDuration');
    const playPause = $('#btnPlayPause');
    const btnFullscreen = $('#btnFullscreen');
    const playPauseBig = $('#btnPlayPauseBig');
    const jumpBackBig = $('#btnJumpBackBig');
    const jumpForwardBig = $('#btnJumpForwardBig');
    // Set the video source
    vid.src = url;
    const isVideoPlaying = () => !!(vid.currentTime > 0 && !vid.paused && !vid.ended && vid.readyState > 2);
    // Handle showing and hiding controls
    let controlsHideTimeout;
    const hideControls = () => document.body.dataset.controlsVisible = 'false';
    const startControlsHide = () => {
        clearTimeout(controlsHideTimeout);
        document.body.dataset.controlsVisible = 'true';
        controlsHideTimeout = setTimeout(() => {
            if (isVideoPlaying()) hideControls();
        }, 2000);
    };
    // Handle the loading spinner
    let isWaiting = true;
    setInterval(() => {
        const isDownloading = vid.networkState === vid.NETWORK_LOADING;
        const isWaitingForData = vid.readyState < vid.HAVE_FUTURE_DATA;
        if (!vid.paused && (isWaiting || isDownloading || isWaitingForData)) {
            spinner.classList.add('visible');
        } else {
            spinner.classList.remove('visible');
        }
    }, 1000);
    // Handle updating progress
    let lastProgressSave = 0;
    const updateProgress = () => {
        // Update timers and progress bar
        timeProgress.innerText = formatSeconds(vid.currentTime);
        timeDuration.innerText = formatSeconds(vid.duration);
        progress.dataset.max = vid.duration*100;
        progress.dataset.value = vid.currentTime*100;
        progress.dispatchEvent(new Event('change'));
        // Update the buffers
        const buffers = vid.buffered;
        const duration = vid.duration;
        const elBuffers = $('#buffers');
        elBuffers.innerHTML = '';
        for (let i = 0; i < buffers.length; i++) {
            const start = buffers.start(i);
            const end = buffers.end(i);
            const left = (start/duration)*100;
            const width = Math.min(((end-start)/duration)*100, 100-left);
            if (width > 5) {
                const el = document.createElement('progress');
                el.classList.add('buffer');
                el.style.left = `${left}%`;
                el.style.width = `${width}%`;
                el.min = 0;
                el.max = 1;
                el.value = 0;
                elBuffers.appendChild(el);
            }
        }
        // Save video progress to local storage
        if ((Date.now()-lastProgressSave) > 3000) {
            lastProgressSave = Date.now();
            const vidCompletionPercent = vid.currentTime/vid.duration;
            savedProgress[vid.src] = vid.currentTime;
            if (vidCompletionPercent > 0.9 || vidCompletionPercent < 0.1)
                delete savedProgress[vid.src];
            while (Object.keys(savedProgress) > 100) {
                delete savedProgress[Object.keys(savedProgress).shift()];
            }
            window.localStorage.setItem('video_progress', JSON.stringify(savedProgress));
            console.log(`Updated saved video progress!`);
        }
    };
    // Handle the play/pause buttons
    const updatePlayingState = () => {
        const icon = isVideoPlaying() ? 'pause' : 'play_arrow';
        $('.icon', playPause).innerText = icon;
        $('.icon', playPauseBig).innerText = icon;
    };
    // Video events
    vid.addEventListener('loadedmetadata', () => {
        if (savedProgress[vid.src]) vid.currentTime = savedProgress[vid.src];
        updateProgress();
    });
    vid.addEventListener('canplay', () => {
        if (shouldAutoplay) {
            vid.play();
            updatePlayingState();
            startControlsHide();
        }
    });
    vid.addEventListener('timeupdate', () => {
        updateProgress();
        updatePlayingState();
    });
    vid.addEventListener('play', () => {
        updatePlayingState();
        startControlsHide();
    });
    vid.addEventListener('pause', () => {
        updatePlayingState();
        startControlsHide();
    });
    vid.addEventListener('playing', () => {
        isWaiting = false;
        startControlsHide();
    });
    vid.addEventListener('waiting', () => {
        isWaiting = true;
        startControlsHide();
    });
    let wasPlayingOnSeek = false;
    vid.addEventListener('seeking', () => {
        wasPlayingOnSeek = isVideoPlaying();
        vid.pause();
        updatePlayingState();
        startControlsHide();
    });
    vid.addEventListener('seeked', () => {
        if (wasPlayingOnSeek) vid.play();
        updatePlayingState();
        startControlsHide();
    });
    vid.addEventListener('ended', () => {
        updatePlayingState();
    });
    vid.addEventListener('error', () => popup.show());
    // Button events
    playPause.addEventListener('click', () => {
        if (isVideoPlaying()) {
            vid.pause();
        } else {
            vid.play();
        }
        updatePlayingState();
        startControlsHide();
    });
    btnFullscreen.addEventListener('click', () => {
        if (document.fullscreenEnabled) {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        } else {
            new PopupBuilder()
                .setTitle('Unable to enter fullscreen')
                .addBodyHTML(`<p>Your browser isn't allowing us to enter fullscreen!</p>`)
                .addAction(action => action
                    .setLabel(`Okay`)
                    .setIsPrimary(true))
                .show();
        }
    });
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            $('.icon', btnFullscreen).innerText = 'fullscreen_exit';
            if (titleOnlyFullscreen) elTitle.style.opacity = 1;
        } else {
            $('.icon', btnFullscreen).innerText = 'fullscreen';
            if (titleOnlyFullscreen) elTitle.style.opacity = 0;
        }
    });
    playPauseBig.addEventListener('click', () => playPause.click());
    jumpBackBig.addEventListener('click', () => {
        vid.currentTime -= 10.1;
        vid.currentTime += 0.1;
        updateProgress();
        updatePlayingState();
    });
    jumpForwardBig.addEventListener('click', () => {
        vid.currentTime += 10.1;
        vid.currentTime -= 0.1;
        updateProgress();
        updatePlayingState();
    });
    // Progress input events
    progress.addEventListener('input', () => {
        vid.currentTime = progress.dataset.value/100;
        updateProgress();
    });
    // Global click events
    vid.addEventListener('click', () => {
        if (window.matchMedia('(pointer: coarse)').matches) {
            if (controls.classList.contains('visible')) {
                hideControls();
            } else {
                startControlsHide();
            }
        } else {
            playPause.click();
        }
    });
    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
        updatePlayingState();
        const actions = {
            Space: () => playPause.click(),
            ArrowLeft: () => jumpBackBig.click(),
            ArrowRight: () => jumpForwardBig.click()
        };
        if (e.code in actions) actions[e.code]();
    });
    // Mouse movement
    window.addEventListener('mousemove', () => {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        startControlsHide();
    });
    // Context menu
    const menu = new ContextMenuBuilder()
        .addItem(item => item
            .setIcon('speed')
            .setLabel('Set playback speed')
            .setClickHandler(() => {
                const submenu = new ContextMenuBuilder();
                const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
                for (const speed of speeds) {
                    submenu.addItem(item => item
                        .setLabel(`${speed}x`)
                        .setClickHandler(() => vid.playbackRate = speed));
                }
                submenu.addSeparator();
                submenu.addItem(item => item
                    .setLabel('Custom...')
                    .setClickHandler(() => {
                        new PopupBuilder()
                            .setTitle('Set playback speed')
                            .addBodyHTML(`
                                <div class="row gap-10 align-center">
                                    <input id="inputSpeed" class="textbox" type="number" min="0.1" max="10" step="0.05" style="width: 100px">
                                    <div class="slider" data-min="0.1" data-max="10" data-step="0.05" data-value="${vid.playbackRate}" data-textbox="#inputSpeed" style="width: 300px"></div>
                                </div>
                            `)
                            .addAction(action => action
                                .setLabel('Set')
                                .setIsPrimary(true)
                                .setClickHandler(() => {
                                    const speed = parseFloat($('#inputSpeed').value);
                                    if (speed) vid.playbackRate = speed;
                                }))
                            .addAction(action => action.setLabel('Cancel'))
                            .show();
                    }));
                submenu.setIconVisibility(false).showAtElement(item.el);
            }))
        .addSeparator()
        .addItem(item => item
            .setIcon('open_in_new')
            .setLabel('Open player in new tab')
            .setClickHandler(() => window.open(window.location.href, '_blank')))
        .addItem(item => item
            .setIcon('refresh')
            .setLabel('Reload player')
            .setClickHandler(() => window.location.reload()));
    btnMenu.addEventListener('click', () => menu.showAtElement(btnMenu));
    window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        menu.showAtCursor();
    });
});