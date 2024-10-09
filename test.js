import { Builder, By, until } from 'selenium-webdriver'
import { assert } from 'chai'

describe('Music163 Navigation Tests', function() {
    this.timeout(10000) // 设置超时时间为 10 秒
    let driver

    before(async function() {
        driver = await new Builder().forBrowser('MicrosoftEdge').build()
        await driver.get("https://music.163.com")
        await driver.manage().window().maximize()
    })

    it('should navigate through links', async function() {
        this.timeout(20000) // 设置超时时间为 20 秒
        const links = ["排行榜", "歌单" ]
        for (const link of links) {
            const element = await driver.wait(until.elementLocated(By.linkText(link)), 10000)
            await driver.wait(until.elementIsVisible(element), 10000)
            await element.click()
            await driver.sleep(2000)
            const title = await driver.getTitle()
            assert.include(title, link, `Expected to be on ${link} page`)
            await driver.navigate().back()
            await driver.sleep(2000)
        }
    })

    after(async function() {
        await driver.quit()
    })
})
