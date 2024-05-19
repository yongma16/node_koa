const { Builder, By, Key, until } = require('selenium-webdriver');


const chrome = require('selenium-webdriver/chrome');

// 设置 Chrome 的选项  
let options = new chrome.Options();
// C:\Users\MY\AppData\Local\Google\Chrome\User Data\Default
options.addArguments('--user-data-dir=G:\\node_selenium\\chrome_data');


const delayTime = (delay) => {
    return new Promise(resolve => setTimeout(resolve, delay))
}

const test = async() => {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {

        // outlook 邮箱
        await driver.get('https://outlook.live.com/mail/0/');

        await delayTime(3000)
            // 等待元素可见  
            // await driver.wait(until.elementIsVisible(By.xpath("//div[@class='S2NDX']")), 10000);
        const recieveListDrivers = await driver.findElements(By.xpath("//div[@class='S2NDX']"))
            // 获取元素的 HTML 内容  
            // let htmlContent = await recieveListDrivers.getInnerHtml();
            // console.log(recieveListDrivers);
        await delayTime(1000)
        recieveListDrivers.some(async(childItem) => {
            let htmlContent = await childItem.getAttribute('outerHTML');
            console.log('htmlContent\n', htmlContent);
            let emailInstanceDriver = await childItem.findElements(By.xpath("//div"))

            await delayTime(1000)
            if (emailInstanceDriver) {
                let emailNumberVal = await emailInstanceDriver[0].getText()

                let emailTitleVal = await emailInstanceDriver[1].findElement(By.xpath("//div")).getText()
                console.log('emailNumberVal', emailNumberVal)
                console.log('emailTitleVal', emailTitleVal)
                if (emailNumberVal === '1432448610@qq.com' && emailTitleVal === 'monaco') {
                    console.log('找到了')
                    console.log('emailNumberVal', emailNumberVal)
                    console.log('emailTitleVal', emailTitleVal)
                    return true
                }
            }

        })




    } catch (r) {
        console.error(r)
    } finally {
        await delayTime(10000)
            // 关闭浏览器  
        await driver.quit();
    }
}

test()