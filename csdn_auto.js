const { Builder, By, Key, until } = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');

// 设置 Chrome 的选项  
let options = new chrome.Options();
// chrome缓存
options.addArguments('--user-data-dir=G:\\node_selenium\\chrome_data');


// 延时
const delayTime = (delay) => {
    return new Promise(resolve => setTimeout(resolve, delay))
}

const test = async() => {
    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();


    try {

        // csdn 红包 页面
        await driver.get('https://bbs.csdn.net/?type=4');


        await delayTime(3000);
        // 红包 dom
        const listDrivers = await driver.findElements(By.xpath("//div[@class='tab-list-item blink']"));
        // 获取当前窗口句柄（可选，但在这里可以作为一个起点）  
        let currentHandle = await driver.getWindowHandle();


        for (let article of listDrivers) {
            // 点击文章dom  进入文章 新开页面了
            article.click();
        }


        await delayTime(1000);


        // 获取所有窗口句柄  
        let allHandles = await driver.getAllWindowHandles();

        // 遍历所有窗口句柄并切换到它们  
        for (let handle of allHandles) {
            // 跳过当前窗口
            if (handle === currentHandle) {
                // 关闭当前窗口
                await driver.close()
                continue
            }

            // 切换窗口
            await driver.switchTo().window(handle);

            await delayTime(3000);
            // 查找获取红包
            const rewardDrivers = await driver.findElements(By.xpath("//span[@class='amount']"))

            for (let reward of rewardDrivers) {
                // 点击 弹出红包弹框  同一个页面
                reward.click();
                break;
            }



            // 弹窗的dom
            const popDrivers = await driver.findElements(By.xpath("//div[@class='red-openbtn open-start']"))

            console.log('popDrivers', popDrivers)
            for (let open of popDrivers) {
                // 点击打开红包 同一个页面
                open.click();
            }
        }


    } catch (r) {
        console.error(r)
    } finally {
        await delayTime(10000)
            // 关闭浏览器  
        await driver.quit();
    }
}

test()