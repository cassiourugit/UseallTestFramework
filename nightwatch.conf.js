const chromedriver = require('chromedriver');

module.exports = {
    page_objects_path: 'js/page_objects',
    test_settings: {
        default: {
            webdriver: {
                start_process: true,
                server_path: chromedriver.path,
                port: 4444,
                cli_args: ['--port=4444']
            },
            screenshots: {
                enabled: true,
                on_failure: true,
                on_error: true,
                path: 'screenshots'
            },
            desiredCapabilities: {
                browserName: 'chrome',
                version: "76.0.1",
                chromeOptions: {
                    args: [
                        //'headless',
                        //'window-size=1920,1080',
                        'start-maximized',
                        'incognito',
                        'no-sandbox',
                        'disable-gpu'
                    ]
                },
            }
        }
    }
};