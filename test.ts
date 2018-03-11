input.onButtonPressed(Button.A, () => {
    DS1307.setSecond(0)
})
DS1307.start()
basic.forever(() => {
    basic.showNumber(DS1307.getSecond() % 10)
    basic.pause(100)
})