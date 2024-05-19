const { Builder, By, Key, until } = require('selenium-webdriver');


const chrome = require('selenium-webdriver/chrome');

// 设置 Chrome 的选项  
let options = new chrome.Options();

// 指定 Chrome 的用户数据目录（profile directory）  
// 替换 '/path/to/your/profile' 为你的实际用户数据目录路径  
options.setUserPreferences({
    "profile": {
        "default_content_setting_values": {
            "geolocation": 1,
            "notifications": 1
        },
        "content_settings": {
            "pattern_pairs": {
                "http://*.example.com,*": {
                    "geolocation": 1
                }
            }
        }
    }
});

// 添加用户数据目录参数  
// 注意：在 Windows 上，路径可能是 "C:\\path\\to\\your\\profile"  
// options.addArguments('user-data-dir=/path/to/your/profile');
options.addArguments('user-data-dir=C:\\Users\\MY\\AppData\\Local\\Google\\Chrome\\User Data\\Default');


const delayTime = (delay) => {
    return new Promise(resolve => setTimeout(() => resolve), delay)
}

const test = async() => {
    let driver = await new Builder()
        .forBrowser('chrome')
        .build();

    try {
        // 打开网页  
        await driver.get('http://www.baidu.com');

        // 找到元素并与之交互  
        let element = await driver.findElement(By.name('q'));
        await element.sendKeys('webdriver', Key.RETURN);

        // 等待页面加载完成  
        await driver.wait(until.titleIs('webdriver - Google Search'), 1000);

        console.log(await driver.getTitle());

    } finally {
        await delayTime(5000)
            // 关闭浏览器  
        await driver.quit();
    }
}

test()