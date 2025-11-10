// 祝福语列表
const blessings = [
    "生日快乐！🎉",
    "天天开心！😊",
    "健康快乐！💪",
    "心想事成！✨",
    "万事如意！🌟",
    "幸福美满！❤️",
    "前程似锦！🚀",
    "笑口常开！😄",
    "青春永驻！🌸",
    "友谊长存！🤝",
    "梦想成真！🌈",
    "好运连连！🍀",
    "平安喜乐！🕊️",
    "财源滚滚！💰",
    "事业有成！💼",
    "家庭幸福！🏠",
    "学业进步！📚",
    "身体健康！💪",
    "永远年轻！🎂"
];

// 祝福语颜色列表
const blessingColors = [
    'rgba(255, 107, 107, 0.9)', 'rgba(77, 150, 255, 0.9)', 'rgba(107, 207, 127, 0.9)',
    'rgba(255, 217, 61, 0.9)', 'rgba(240, 147, 251, 0.9)', 'rgba(255, 142, 142, 0.9)',
    'rgba(168, 230, 207, 0.9)', 'rgba(255, 170, 165, 0.9)', 'rgba(79, 172, 254, 0.9)',
    'rgba(255, 210, 111, 0.9)', 'rgba(156, 136, 255, 0.9)', 'rgba(255, 159, 67, 0.9)',
    'rgba(72, 219, 251, 0.9)', 'rgba(255, 99, 132, 0.9)', 'rgba(54, 162, 235, 0.9)',
    'rgba(255, 206, 86, 0.9)', 'rgba(75, 192, 192, 0.9)', 'rgba(153, 102, 255, 0.9)',
    'rgba(255, 159, 64, 0.9)', 'rgba(199, 199, 199, 0.9)'
];

// 背景音乐控制
let bgm = null;
let isMusicPlaying = false;

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const dialogOverlay = document.getElementById('dialog-overlay');
    const mainContent = document.getElementById('main-content');
    const confirmBtn = document.getElementById('confirm-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const giftLid = document.querySelector('.gift-lid');
    const giftBody = document.querySelector('.gift-body');

    // 确保对话框在页面加载时显示
    setTimeout(() => {
        dialogOverlay.style.display = 'flex';
    }, 100);
    
    // 自动播放背景音乐
    const bgm = document.getElementById('birthdayBGM');
    if (bgm) {
        // 设置音乐从0:51开始播放到1:10，然后循环
        bgm.currentTime = 51; // 从51秒开始（0:51）
        
        // 延迟播放以避免浏览器自动播放限制
        setTimeout(() => {
            bgm.play().catch(e => {
                console.log('自动播放失败，需要用户交互:', e);
                // 如果自动播放失败，在用户点击时播放
                document.addEventListener('click', function autoPlayOnClick() {
                    bgm.currentTime = 51; // 从51秒开始（0:51）
                    bgm.play().then(() => {
                        console.log('音乐开始播放');
                        // 设置循环播放逻辑
                        setupMusicLoop(bgm);
                    }).catch(err => {
                        console.log('点击后播放失败:', err);
                    });
                    document.removeEventListener('click', autoPlayOnClick);
                });
            });
            
            // 设置循环播放逻辑
            setupMusicLoop(bgm);
        }, 500);
    }
    
    // 设置音乐循环播放逻辑
    function setupMusicLoop(bgm) {
        bgm.addEventListener('timeupdate', function() {
            // 当播放到1:10（70秒）时，跳回到0:51（51秒）继续播放
            if (bgm.currentTime >= 70) {
                bgm.currentTime = 51;
            }
        });
    }
    


    // 确认按钮点击事件
    confirmBtn.addEventListener('click', function() {
        // 添加确认动画效果
        this.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            // 隐藏对话框
            dialogOverlay.style.opacity = '0';
            
            setTimeout(() => {
                dialogOverlay.style.display = 'none';
                
                // 显示主页面内容
                mainContent.classList.remove('hidden');
                
                // 播放庆祝效果
                playCelebration();
                
                // 先显示气球动画
                createBalloons();
                
                // 延迟7秒后启动祝福语弹出功能
                setTimeout(() => {
                    startBlessings();
                }, 5000);
                
            }, 300);
        }, 150);
    });

    // 取消按钮点击事件
    cancelBtn.addEventListener('click', function() {
        // 添加取消动画效果
        this.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            // 显示提示信息
            const dialogContent = document.querySelector('.dialog-content');
            const originalHTML = dialogContent.innerHTML;
            
            dialogContent.innerHTML = `
                <h2>🎁 礼物还在等待</h2>
                <p>礼物会一直在这里等你来打开！</p>
                <div class="dialog-buttons">
                    <button id="back-btn" class="btn confirm-btn">返回打开</button>
                </div>
            `;
            
            // 返回按钮事件
            document.getElementById('back-btn').addEventListener('click', function() {
                dialogContent.innerHTML = originalHTML;
                // 重新绑定事件
                document.getElementById('confirm-btn').addEventListener('click', confirmBtn.click.bind(confirmBtn));
                document.getElementById('cancel-btn').addEventListener('click', cancelBtn.click.bind(cancelBtn));
            });
            
        }, 150);
    });


    // 庆祝效果
    function playCelebration() {
        // 创建庆祝粒子效果
        createConfetti();
        
        // 播放音效（如果有的话）
        playBirthdaySound();
        
        // 标题跳动效果
        const title = document.querySelector('.birthday-container h1');
        title.style.animation = 'bounce 0.5s ease 3';
        
        // 移除气球放大效果
    }

    // 创建气球动画（简洁CSS气球效果）
    function createBalloons() {
        // 气球颜色配置
        const balloonColors = [
            {hue: 0, name: '红色'},    // 红色
            {hue: 120, name: '绿色'},  // 绿色
            {hue: 240, name: '蓝色'},  // 蓝色
            {hue: 30, name: '橙色'},   // 橙色
            {hue: 300, name: '紫色'},  // 紫色
            {hue: 180, name: '青色'},  // 青色
            {hue: 60, name: '黄色'},   // 黄色
            {hue: 330, name: '粉色'}   // 粉色
        ];
        
        // 创建多个气球 - 2.5秒内密集出现
        for (let i = 0; i < 60; i++) {
            setTimeout(() => {
                // 随机选择气球颜色
                const randomColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
                
                // 创建气球容器
                const balloon = document.createElement('div');
                balloon.className = 'balloon';
                
                // 设置气球样式变量
                balloon.style.setProperty('--hue', randomColor.hue);
                balloon.style.setProperty('--left', `${Math.random() * 90 + 5}%`); // 随机水平位置（5%-95%）
                balloon.style.setProperty('--size', `${Math.random() * 25 + 15}`); // 随机大小（15-40）
                balloon.style.setProperty('--rate', `${Math.random() * 1.5 + 2.5}`); // 随机速度（2.5-4秒）
                balloon.style.setProperty('--delay', `${Math.random() * 2.5}`); // 随机延迟（0-2.5秒）
                
                // 创建手把
                const handle = document.createElement('div');
                handle.className = 'handle';
                
                balloon.appendChild(handle);
                document.body.appendChild(balloon);
                
                // 2.5秒后移除气球（气球飞到顶部消失）
                setTimeout(() => {
                    if (balloon.parentNode) {
                        balloon.parentNode.removeChild(balloon);
                    }
                }, 2500); // 2.5秒后移除气球
                
            }, i * 42); // 每隔42毫秒创建一个气球，2.5秒内创建60个气球（2500ms/60≈42ms）
        }
    }

    // 祝福语弹出功能
function startBlessings() {
    setInterval(() => {
        createBlessing();
    }, 300); // 每300毫秒弹出一个祝福语，增加频率
    
    // 同时创建多个祝福语
    setInterval(() => {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => createBlessing(), i * 100);
        }
    }, 800); 
}

// 创建单个祝福语
function createBlessing() {
    const container = document.getElementById('blessings-container');
    const blessing = document.createElement('div');
    
    // 随机选择祝福语和颜色
    const randomText = blessings[Math.floor(Math.random() * blessings.length)];
    const randomColor = blessingColors[Math.floor(Math.random() * blessingColors.length)];
    
    // 设置祝福语样式
    blessing.className = 'blessing-item';
    blessing.textContent = randomText;
    blessing.style.background = randomColor;
    blessing.style.color = '#fff';
    
    // 随机位置（整个屏幕）
    const left = Math.random() * (window.innerWidth - 220);
    const top = Math.random() * (window.innerHeight - 100);
    blessing.style.left = left + 'px';
    blessing.style.top = top + 'px';
    
    // 随机旋转角度
    const rotation = (Math.random() * 20) - 10;
    blessing.style.transform += ` rotate(${rotation}deg)`;
    
    // 添加到容器
    container.appendChild(blessing);
    
    // 动画结束后移除元素
    setTimeout(() => {
        if (blessing.parentNode) {
            blessing.parentNode.removeChild(blessing);
        }
    }, 3000);
}



// 创建五彩纸屑效果
function createConfetti() {
    const colors = ['#ff6b6b', '#4d96ff', '#6bcf7f', '#ffd93d', '#a8edea'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                top: -20px;
                left: ${Math.random() * 100}%;
                animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
                z-index: 9999;
            `;
            
            document.body.appendChild(confetti);
            
            // 动画结束后移除元素
            setTimeout(() => {
                confetti.remove();
            }, 5000);
            
        }, i * 100);
    }
    
    // 添加纸屑下落动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(style);
}

    // 播放生日音效（基础版本，使用浏览器内置声音）
    function playBirthdaySound() {
        // 创建简单的音效使用Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // 播放庆祝音调
            playTone(audioContext, 523.25, 0.1); // C5
            setTimeout(() => playTone(audioContext, 659.25, 0.1), 100); // E5
            setTimeout(() => playTone(audioContext, 783.99, 0.1), 200); // G5
            setTimeout(() => playTone(audioContext, 1046.50, 0.3), 300); // C6
        } catch (error) {
            console.log('音效播放失败，但庆祝效果正常显示');
        }
    }

    // 播放单个音调
    function playTone(audioContext, frequency, duration) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }

    // 添加键盘支持
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && dialogOverlay.style.display === 'flex') {
            confirmBtn.click();
        } else if (event.key === 'Escape' && dialogOverlay.style.display === 'flex') {
            cancelBtn.click();
        }
    });

    // 添加触摸设备优化
    document.addEventListener('touchstart', function() {
        // 确保在移动设备上也能正常播放音效
    }, { passive: true });

    console.log('生日惊喜页面已加载完成！');
});

