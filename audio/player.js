
const isPlaying = media => !!(media.currentTime > 0 && !media.paused && !media.ended && media.readyState > 2);

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
                        audio.playbackRate = speed;
                    }
                });
            });
            showContext(items);
        }
    }, { type: 'sep' }, {
        type: 'item',
        name: `Copy audio source URL`,
        icon: 'content_copy',
        action: () => copyText(audio.src)
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

window.addEventListener('load', () => {
    const audio = $('#audio');
    const updateTime = () => {
        _id('prog').value = audio.currentTime;
        _id('progFill').value = audio.currentTime;
        _id('progress').innerText = formatSeconds(audio.currentTime);
        _id('duration').innerText = formatSeconds(audio.duration);
        const buffers = audio.buffered;
        const duration = audio.duration;
        _id('buffers').innerHTML = '';
        for (let i = 0; i < buffers.length; i++) {
            const start = buffers.start(i);
            const end = buffers.end(i);
            const left = (start/duration)*100;
            const width = ((end-start)/duration)*100;
            if (width > 1)
                _id('buffers').insertAdjacentHTML('beforeend', `
                    <progress class="buffer" style="left: ${left}%; width: ${width}%" min="0" max="1" value="0"></progress>
                `);
        }
    }
    const updateSpeed = () => {
        $('#speedCont').classList.add('hidden');
        if (audio.playbackRate !== 1) {
            $('#speedCont').classList.remove('hidden');
            $('#speed').innerText = `${audio.playbackRate}x`;
        }
    }
    on(audio, 'loadedmetadata', () => {
        _id('progFill').max = audio.duration;
        _id('prog').max = audio.duration;
    });
    on(audio, 'timeupdate', updateTime);
    on(audio, ['play', 'playing'], () => {
        $('#play .icon').innerText = 'pause';
    });
    on(audio, 'pause', () => {
        $('#play .icon').innerText = 'play_arrow';
    });
    on(audio, 'ratechange', updateSpeed);
    on($('#prog'), 'input', () => {
        const value = $('#prog').value;
        audio.currentTime = value;
        updateTime();
    });
    on($('#play'), 'click', () => {
        if (isPlaying(audio)) audio.pause();
        else audio.play();
    });
    on($('#menu'), 'click', showMenu);
    audio.autoplay = true;
    audio.src = encodeURI(params.get('url'));
    const audioName = params.get('name') || params.get('url').split('?')[0].split('/').reverse()[0];
    _id('title').innerText = audioName;
    document.title = audioName;
    if (params.get('hue')) {
        document.body.style.setProperty('--fgHue', params.get('hue'));
    }
});