const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => parent.querySelectorAll(selector);

const on = (element, event, handler) => {
    element.addEventListener(event, handler);
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getTimezoneString = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offsetMinutes = new Date().getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
    const remainingMinutes = Math.abs(offsetMinutes) % 60;

    const offsetSign = offsetMinutes <= 0 ? "+" : "-";
    const formattedOffset = remainingMinutes
        ? `${offsetSign}${offsetHours.toString()}:${remainingMinutes.toString().padStart(2, '0')}`
        : `${offsetSign}${offsetHours.toString()}`;

    return `${timezone} (UTC${formattedOffset})`;
};

const resizeTextArea = (textarea) => {
    if (!textarea.scrollHeight) return;
    if (textarea.dataset.noResize) return;
    textarea.style.height = 'auto';
    const fontSize = parseInt(textarea.dataset.fontSize) || 15;
    const lineHeight = parseFloat(textarea.dataset.lineHeight) || 1.4;
    const minLineCount = parseInt(textarea.dataset.minLines) || 1;
    const maxLineCount = parseInt(textarea.dataset.maxLines) || 25;
    const minHeight = (fontSize * lineHeight) * minLineCount;
    const maxHeight = (fontSize * lineHeight) * maxLineCount;
    textarea.style.height = Math.max(minHeight, Math.min(maxHeight, textarea.scrollHeight)) + 'px';
};

on(document, 'DOMContentLoaded', () => {
    on(document, 'input', function (event) {
        if (event.target.tagName.toLowerCase() === 'textarea') {
            resizeTextArea(event.target);
        }
    });
    for (const el of $$('textarea', document)) {
        resizeTextArea(el);
    }
    buildSliders();
});

const getAvgImgColor = async (url) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    try {
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });
    } catch (error) {
        console.error('Failed to load image:', error);
        return [ 0, 0, 0 ];
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, img.width, img.height).data;
    let r = 0, g = 0, b = 0, count = 0;
    for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
    }
    r = Math.floor(r / count);
    g = Math.floor(g / count);
    b = Math.floor(b / count);
    return [r, g, b];
}

const modalActionTemplate = {
    done: {
        label: 'Done',
        class: 'primary'
    },
    okay: {
        label: 'Okay',
        class: 'primary'
    },
    cancel: {
        label: 'Cancel',
        class: 'text'
    },
    close: {
        label: 'Close',
        class: 'secondary'
    }
};
const showModal = (options) => {
    options = options || {};
    options.title = options.title || 'Modal';
    options.bodyHTML = options.bodyHTML || '';
    options.actions = options.actions || [modalActionTemplate.close];
    options.cancellable = options.cancellable === false ? false : true;
    const elModal = document.createElement('dialog');
    elModal.classList.add('modal', 'flex', 'col', 'gap-12');
    elModal.innerHTML = /*html*/`
        <div class="content flex col gap-12">
            <div class="titlebar flex row align-center gap-12">
                <div class="title grow">${options.title}</div>
            </div>
            <div class="body">${options.bodyHTML}</div>
            <div class="actions flex row-rev wrap gap-12"></div>
        </div>
    `;
    const elContent = $('.content', elModal);
    const titlebar = $('.titlebar', elModal);
    if (options.icon) {
        titlebar.insertAdjacentHTML('afterbegin', /*html*/`
            <div class="icon-32 text-${options.icon.class || 'muted'}">${options.icon.name}</div>
        `);
    }
    const elActions = $('.actions', elModal);
    for (const action of options.actions) {
        const elButton = document.createElement('button');
        elButton.classList.add('btn', 'larger', action.class || undefined);
        elButton.innerText = action.label;
        elButton.disabled = action.disabled || false;
        elButton.onclick = async () => {
            const btns = $$('button', elActions);
            for (const btn of btns) {
                btn.disabled = true;
            }
            if (action.onClick) await action.onClick();
            if (action.close !== false) elModal.close();
        };
        elActions.appendChild(elButton);
    }
    on(elContent, 'click', (e) => {
        e.stopPropagation();
    });
    on(elModal, 'click', () => {
        elModal.dispatchEvent(new Event('cancel'));
    });
    on(elModal, 'cancel', (e) => {
        e.preventDefault();
        if (options.cancellable) {
            if (options.onCancel) options.onCancel();
            elModal.close();
        }
    });
    on(elModal, 'close', () => {
        if (options.onClose) options.onClose();
        if (!elModal.classList.contains('visible')) return;
        elModal.showModal();
        elModal.classList.remove('visible');
        setTimeout(() => {
            elModal.remove();
        }, 300);
    });
    on(elModal, 'keydown', (e) => {
        if (e.key === 'Escape') {
            if (!options.cancellable)
                e.preventDefault();
        }
    });
    document.body.appendChild(elModal);
    elModal.showModal();
    setTimeout(() => elModal.classList.add('visible'), 10);
    return elModal;
};

const mouse = { x: 0, y: 0 };
on(document, 'mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

const showContextMenu = (options, shouldPosition = true) => {
    options = options || {};
    options.width = options.width || 'auto';
    options.items = options.items || [];
    options.x = options.x || mouse.x;
    options.y = options.y || mouse.y;
    const elMenu = document.createElement('dialog');
    elMenu.classList.add('contextMenu', 'flex', 'col', 'gap-4');
    for (const item of options.items) {
        switch (item.type) {
            case 'item': {
                const btn = document.createElement('button');
                btn.classList = 'item btn text';
                if (item.danger) btn.classList.add('danger');
                if (item.disabled) btn.disabled = true;
                btn.innerHTML += `<span class="label grow">${item.label}</span>`;
                if (item.icon) {
                    btn.innerHTML += `<span class="icon">${item.icon}</span>`;
                }
                btn.onclick = async () => {
                    if (item.onClick) await item.onClick();
                    elMenu.close();
                };
                elMenu.appendChild(btn);
                break;
            }
            case 'submenu': {
                const btn = document.createElement('button');
                btn.classList = 'item btn text';
                if (item.danger) btn.classList.add('danger');
                if (item.disabled) btn.disabled = true;
                btn.innerHTML += `<span class="label grow">${item.label}</span>`;
                btn.innerHTML += `<span class="icon">chevron_right</span>`;
                let elSubMenu;
                const openSubMenu = () => {
                    if (elSubMenu) elSubMenu.close();
                    const opts = item.opts;
                    elSubMenu = showContextMenu(opts, false);
                    // Position submenu
                    const parentBtnRect = btn.getBoundingClientRect();
                    const screenWidth = window.innerWidth;
                    const screenHeight = window.innerHeight;
                    const subMenuRect = elSubMenu.getBoundingClientRect();
                    const subMenuWidth = subMenuRect.width;
                    const subMenuHeight = elSubMenu.scrollHeight;
                    const xRight = parentBtnRect.right + 12;
                    const xLeft = parentBtnRect.left - subMenuWidth - 12;
                    let x = xRight;
                    let y = parentBtnRect.top;
                    if ((x + subMenuWidth) > screenWidth) {
                        x = Math.max(0, xLeft);
                    }
                    if ((y + subMenuHeight) > screenHeight) {
                        y = Math.max(0, (y - subMenuHeight));
                    }
                    elSubMenu.style.left = `${x}px`;
                    elSubMenu.style.top = `${y}px`;
                };
                on(btn, 'click', openSubMenu);
                on(btn, 'mouseenter', openSubMenu);
                on(btn, 'mouseleave', () => {
                    if (elSubMenu) elSubMenu.close();
                });
                elMenu.appendChild(btn);
                break;
            }
            case 'element': {
                elMenu.appendChild(item.element);
                break;
            }
            case 'separator': {
                const el = document.createElement('div');
                el.classList.add('separator');
                elMenu.appendChild(el);
                break;
            }
        }
    }
    on(elMenu, 'click', () => {
        elMenu.close();
    });
    on(elMenu, 'keydown', (e) => {
        const items = $$('button.item:not(:disabled)', elMenu);
        let index = [...items].indexOf(document.activeElement);
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            index = (index + 1) % items.length;
            items[index].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            index = (index - 1 + items.length) % items.length;
            items[index].focus();
        }
    });
    on(elMenu, 'close', () => {
        if (!elMenu.classList.contains('visible')) return;
        elMenu.classList.remove('visible');
        setTimeout(() => {
            elMenu.remove();
        }, 300);
    });
    document.body.appendChild(elMenu);
    elMenu.showModal();
    // Position menu
    if (shouldPosition) {
        elMenu.style.transition = 'none';
        setTimeout(() => {
            const rect = elMenu.getBoundingClientRect();
            const menuWidth = rect.width;
            const menuHeight = elMenu.scrollHeight;
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            let x = options.x;
            let y = options.y;
            if ((y + menuHeight) > screenHeight) {
                y = Math.max(0, (screenHeight - menuHeight - 8));
            }
            if ((x + menuWidth) > screenWidth) {
                x = Math.max(0, (x - menuWidth));
            }
            elMenu.style.left = `${x}px`;
            elMenu.style.top = `${y}px`;
            elMenu.style.height = `${menuHeight}px`;
        }, 10);
    }
    // Show menu
    setTimeout(() => {
        elMenu.style.transition = '';
        elMenu.classList.add('visible');
    }, 20);
    return elMenu;
};

on(window, 'resize', () => {
    const contextMenus = $$('dialog.contextMenu');
    contextMenus.forEach(menu => menu.close());
});

const buildSliders = () => {
    // Get slider elements
    const sliders = $$('div.slider:not([data-modified])');
    // Loop through 'em
    for (const slider of sliders) {
        // Create elements
        const prog = document.createElement('progress');
        const input = document.createElement('input');
        // Set attributes
        let textbox;
        const onSliderChange = () => {
            // Collect data values
            const min = slider.dataset.min || 0;
            const max = slider.dataset.max || 100;
            const step = slider.dataset.step || 1;
            const value = slider.dataset.value || 0;
            const rangeId = slider.dataset.rangeId;
            const progId = slider.dataset.progId;
            const progClass = slider.dataset.progClass || 'primary';
            textbox = $(slider.dataset.textbox);
            // Set attributes
            input.type = 'range';
            input.min = min;
            input.max = max;
            input.value = value;
            input.step = step;
            prog.min = min;
            prog.max = max;
            prog.value = value;
            prog.step = step;
            prog.classList.add(progClass);
            if (progId) prog.id = progId || '';
            if (rangeId) input.id = rangeId || '';
            // Handle the textbox
            if (textbox) {
                textbox.type = 'number';
                textbox.min = min;
                textbox.max = max;
                textbox.step = step;
                textbox.value = value;
                textbox.oninput = () => {
                    input.value = textbox.value;
                    input.dispatchEvent(new Event('input'));
                };
                textbox.onchange = textbox.oninput;
            }
            // Dispatch events
            input.dispatchEvent(new Event('change'));
            prog.dispatchEvent(new Event('change'));
        };
        onSliderChange();
        // Append elements
        slider.appendChild(prog);
        slider.appendChild(input);
        // Add event listeners
        input.addEventListener('input', () => {
            slider.dataset.value = input.value;
            prog.value = slider.dataset.value;
            if (textbox) textbox.value = slider.dataset.value;
            slider.dispatchEvent(new Event('input'));
        });
        input.addEventListener('change', () => {
            slider.dataset.value = input.value;
            prog.value = slider.dataset.value;
            if (textbox) textbox.value = slider.dataset.value;
        });
        prog.addEventListener('change', () => {
            input.value = slider.dataset.value;
            if (textbox) textbox.value = slider.dataset.value;
        });
        slider.addEventListener('change', onSliderChange);
        // Mark the slider as added
        slider.dataset.modified = true;
    }
};

const roundSmart = (num) => {
    const wholePart = Math.floor(num);
    let roundedNum;

    if (wholePart >= 100) {
        roundedNum = num.toFixed(0);
    } else if (wholePart >= 10) {
        roundedNum = num.toFixed(1);
    } else {
        roundedNum = num.toFixed(2);
    }

    return parseFloat(roundedNum);
};

const formatNumber = (n, precise = true, fullWords = false) => {
    const pow = Math.pow;
    if (!precise) {
        // I'm sorry if this code causes you cancer
        // I know there's a better way to do this but frankly I can't be bothered
        // I'm feeling rather devious writing this rn >:3
        if (n < pow(10, 3))
            return Math.round(n)
        if (n < pow(10, 6))
            return roundSmart(n / pow(10, 3)) + (fullWords ? ' thousand' : 'K');
        if (n < pow(10, 9))
            return roundSmart(n / pow(10, 6)) + (fullWords ? ' million' : 'M');
        if (n < pow(10, 12)) 
            return roundSmart(n / pow(10, 9)) + (fullWords ? ' billion' : 'B');
        return 'infinite';
    }
    // Return full number with commas
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}