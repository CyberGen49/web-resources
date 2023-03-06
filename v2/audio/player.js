
window.addEventListener('load', () => {

    const url = params.get('url');
    const popup = new PopupBuilder()
        .setTitle('Unable to play audio')
        .addBodyHTML(`<p>Something went wrong while trying to play the audio file located at <b>${url}</b>. Try reloading the player, or downloading the file instead.</p>`)
        .addAction(action => action
            .setLabel(`Reload`)
            .setIsPrimary(true)
            .setClickHandler(() => window.location.reload()))
        .addAction(action => action
            .setLabel(`Download`)
            .setClickHandler(() => promptUrlDownload(audio.src)))
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
    const hideTitle = !!params.get('hideTitle');
    if (!hideTitle) elTitle.classList.add('visible');
    const shouldAutoplay = !!params.get('autoplay');
    const hideBorder = !!params.get('hideBorder');
    if (hideBorder) $('#controls').style.border = 'none';
    document.body.dataset.isEmbed = (window.top !== window);
    // Get elements
    const audio = $('#audio');
    const btnMenu = $('#btnMenu');
    const progress = $('#progress');
    const timeProgress = $('#timeProgress');
    const timeDuration = $('#timeDuration');
    const playPause = $('#btnPlayPause');
    const btnVolume = $('#btnVolume');
    // Set the audio source
    audio.src = url;
    const isAudioPlaying = () => !!(audio.currentTime > 0 && !audio.paused && !audio.ended && audio.readyState > 2);
    // Handle updating progress
    const updateProgress = () => {
        // Update timers and progress bar
        timeProgress.innerText = formatSeconds(audio.currentTime);
        timeDuration.innerText = formatSeconds(audio.duration);
        progress.dataset.max = audio.duration*100;
        progress.dataset.value = audio.currentTime*100;
        progress.dispatchEvent(new Event('change'));
        // Update the buffers
        const buffers = audio.buffered;
        const duration = audio.duration;
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
    };
    // Handle the play/pause buttons
    const updatePlayingState = () => {
        const icon = isAudioPlaying() ? 'pause' : 'play_arrow';
        playPause.title = isAudioPlaying() ? 'Pause' : 'Play';
        $('.icon', playPause).innerText = icon;
    };
    // Handle volume
    const updateVolume = vol => {
        vol = Math.min(Math.max(vol, 0), 1);
        audio.volume = vol;
        let level = 0;
        if (audio.muted || vol == 0) level = 0;
        else if (vol < 0.33) level = 1;
        else if (vol < 0.66) level = 2;
        else level = 3;
        btnVolume.classList.toggle('text-danger', audio.muted);
        btnVolume.dataset.volume = level;
        btnVolume.title = `Volume ${Math.ceil(audio.volume*100)}%`;
    }
    updateVolume(audio.volume);
    // Audio events
    audio.addEventListener('loadedmetadata', () => {
        updateProgress();
    });
    audio.addEventListener('canplay', () => {
        if (shouldAutoplay) {
            audio.play();
            updatePlayingState();
        }
    });
    audio.addEventListener('timeupdate', () => {
        updateProgress();
        updatePlayingState();
    });
    audio.addEventListener('play', () => {
        updatePlayingState();
    });
    audio.addEventListener('pause', () => {
        updatePlayingState();
    });
    audio.addEventListener('playing', () => {});
    audio.addEventListener('waiting', () => {});
    audio.addEventListener('seeking', () => {
        updatePlayingState();
    });
    audio.addEventListener('seeked', () => {
        updatePlayingState();
    });
    audio.addEventListener('ended', () => {
        updatePlayingState();
    });
    audio.addEventListener('error', () => popup.show());
    // Button events
    playPause.addEventListener('click', () => {
        if (isAudioPlaying()) {
            audio.pause();
        } else {
            audio.play();
        }
        updatePlayingState();
    });
    btnVolume.addEventListener('click', () => {
        const menu = new ContextMenuBuilder();
        menu.el.insertAdjacentHTML('beforeend', `
            <div class="row align-center">
                <div style="padding: 0px 15px">
                    <div id="volSlider" class="slider" data-max=100 data-value="${Math.round(audio.volume*100)}" style="width: 180px"></div>
                </div>
                <button id="btnVolMute" class="btn tertiary iconOnly">
                    <div class="icon"></div>
                </button>
            </div>
        `);
        const slider = $('#volSlider', menu.el);
        const btnVolMute = $('#btnVolMute', menu.el);
        slider.addEventListener('input', () => {
            btnVolMute.classList.toggle('text-danger', audio.muted);
            btnVolMute.title = audio.muted ? 'Unmute' : 'Mute';
            updateVolume(slider.dataset.value/100);
            btnVolMute.dataset.volume = btnVolume.dataset.volume;
        });
        btnVolMute.addEventListener('click', () => {
            audio.muted = !audio.muted;
            slider.dispatchEvent(new Event('input'));
        });
        slider.dispatchEvent(new Event('input'));
        const rect = btnVolume.getBoundingClientRect();
        const x = rect.right+7;
        const y = rect.top-7;
        menu.showAtCoords(x, y);
    });
    // Progress input events
    progress.addEventListener('input', () => {
        audio.currentTime = progress.dataset.value/100;
        updateProgress();
    });
    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
        updatePlayingState();
        const actions = {
            Space: () => playPause.click()
        };
        if (e.code in actions) actions[e.code]();
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
                        .setClickHandler(() => audio.playbackRate = speed));
                }
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