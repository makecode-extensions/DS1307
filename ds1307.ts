/**
* makecode DS1307 RTC Package.
* From microbit/micropython Chinese community.
* http://www.micropython.org.cn
*/

/**
 * DS1307 block
 */
//% weight=20 color=#8010f0 icon="\uf017" block="DS1307"
namespace DS1307 {
    let DS1307_I2C_ADDR = 104;
    let DS1307_REG_SECOND = 0
    let DS1307_REG_MINUTE = 1
    let DS1307_REG_HOUR = 2
    let DS1307_REG_WEEKDAY = 3
    let DS1307_REG_DAY = 4
    let DS1307_REG_MONTH = 5
    let DS1307_REG_YEAR = 6
    let DS1307_REG_CTRL = 7
    let DS1307_REG_RAM = 8

    /**
     * set ds1307's reg
     */
    function setReg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(DS1307_I2C_ADDR, buf);
    }

    /**
     * get ds1307's reg
     */
    function getReg(reg: number): number {
        pins.i2cWriteNumber(DS1307_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(DS1307_I2C_ADDR, NumberFormat.UInt8BE);
    }

    /**
     * convert a Hex data to Dec
     */
    function HexToDec(dat: number): number {
        return (dat >> 4) * 10 + (dat % 16);
    }

    /**
     * convert a Dec data to Hex
     */
    function DecToHex(dat: number): number {
        return Math.idiv(dat, 10) * 16 + (dat % 10)
    }

    /**
     * start ds1307 (go on)
     */
    //% blockId="DS1307_START" block="start"
    //% weight=52 blockGap=8
    //% parts=DS1307 trackArgs=0
    export function start() {
        let t = getSecond()
        setSecond(t & 0x7f)
    }

    /**
     * stop ds1307 (pause)
     */
    //% blockId="DS1307_STOP" block="pause"
    //% weight=51 blockGap=8
    //% parts=DS1307 trackArgs=0
    export function stop() {
        let t = getSecond()
        setSecond(t | 0x80)
    }

    /**
     * get Year
     */
    //% blockId="DS1307_GET_YEAR" block="year"
    //% weight=99 blockGap=8
    //% parts=DS1307 trackArgs=0
    export function getYear(): number {
        return Math.min(HexToDec(getReg(DS1307_REG_YEAR)), 99) + 2000
    }

    /**
     * set year
     * @param dat is the Year will be set, eg: 2018
     */
    //% blockId="DS1307_SET_YEAR" block="set year %dat"
    //% weight=69 blockGap=8
    //% parts=DS1307 trackArgs=0
    export function setYear(dat: number): void {
        setReg(DS1307_REG_YEAR, DecToHex(dat % 100))
    }

    /**
     * get Month
     */
    //% blockId="DS1307_GET_MONTH" block="month"
    //% weight=98 blockGap=8
    //% parts=DS1307 trackArgs=0
    export function getMonth(): number {
        return Math.max(Math.min(HexToDec(getReg(DS1307_REG_MONTH)), 12), 1)
    }

    /**
     * set month
     * @param dat is Month will be set.  eg: 2
     */
    //% blockId="DS1307_SET_MONTH" block="set month %dat"
    //% weight=68 blockGap=8
    //% dat.min=1 dat.max=12
    //% parts=DS1307 trackArgs=0
    export function setMonth(dat: number): void {
        setReg(DS1307_REG_MONTH, DecToHex(dat % 13))
    }

    /**
     * get Day
     */
    //% blockId="DS1307_GET_DAY" block="day"
    //% weight=97 blockGap=8
    //% parts=DS1307 trackArgs=0
    export function getDay(): number {
        return Math.max(Math.min(HexToDec(getReg(DS1307_REG_DAY)), 31), 1)
    }

    /**
     * set day
     * @param dat is the Day will be set, eg: 15
     */
    //% blockId="DS1307_SET_DAY" block="set day %dat"
    //% weight=67 blockGap=8
    //% dat.min=1 dat.max=31
    //% parts=DS1307 trackArgs=0
    export function setDay(dat: number): void {
        setReg(DS1307_REG_DAY, DecToHex(dat % 32))
    }

    /**
     * get Week Day
     */
    //% blockId="DS1307_GET_WEEKDAY" block="weekday"
    //% weight=96 blockGap=8
    //% parts=DS1307 trackArgs=0
    export function getWeekday(): number {
        return Math.max(Math.min(HexToDec(getReg(DS1307_REG_WEEKDAY)), 7), 1)
    }

    /**
     * set weekday
     * @param dat is the Week Day will be set, eg: 4
     */
    //% blockId="DS1307_SET_WEEKDAY" block="set weekday %dat"
    //% weight=66 blockGap=8
    //% dat.min=1 dat.max=7
    //% parts=DS1307 trackArgs=0
    export function setWeekday(dat: number): void {
        setReg(DS1307_REG_WEEKDAY, DecToHex(dat % 8))
    }

    /**
     * get Hour
     */
    //% blockId="DS1307_GET_HOUR" block="hour"
    //% weight=95 blockGap=8
    //% parts=DS1307 trackArgs=0
    export function getHour(): number {
        return Math.min(HexToDec(getReg(DS1307_REG_HOUR)), 23)
    }

    /**
     * set hour
     * @param dat is the Hour will be set, eg: 0
     */
    //% blockId="DS1307_SET_HOUR" block="set hour %dat"
    //% weight=65 blockGap=8
    //% dat.min=0 dat.max=23
    //% parts=DS1307 trackArgs=0
    export function setHour(dat: number): void {
        setReg(DS1307_REG_HOUR, DecToHex(dat % 24))
    }

    /**
     * get Minute
     */
    //% blockId="DS1307_GET_MINUTE" block="minute"
    //% weight=94 blockGap=8
    //% parts=DS1307 trackArgs=0
    export function getMinute(): number {
        return Math.min(HexToDec(getReg(DS1307_REG_MINUTE)), 59)
    }

    /**
     * set minute
     * @param dat is the Minute will be set, eg: 0
     */
    //% blockId="DS1307_SET_MINUTE" block="set minute %dat"
    //% weight=64 blockGap=8
    //% dat.min=0 dat.max=59
    //% parts=DS1307 trackArgs=0
    export function setMinute(dat: number): void {
        setReg(DS1307_REG_MINUTE, DecToHex(dat % 60))
    }

    /**
     * get Second
     */
    //% blockId="DS1307_GET_SECOND" block="second"
    //% weight=93 blockGap=8
    //% parts=DS1307 trackArgs=0
    export function getSecond(): number {
        return Math.min(HexToDec(getReg(DS1307_REG_SECOND)), 59)
    }

    /**
     * set second
     * @param dat is the Second will be set, eg: 0
     */
    //% blockId="DS1307_SET_SECOND" block="set second %dat"
    //% weight=63 blockGap
    //% dat.min=0 dat.max=59
    //% parts=DS1307 trackArgs=0
    export function setSecond(dat: number): void {
        setReg(DS1307_REG_SECOND, DecToHex(dat % 60))
    }

    /**
     * set Date and Time
     * @param year is the Year will be set, eg: 2018
     * @param month is the Month will be set, eg: 2
     * @param day is the Day will be set, eg: 15
     * @param weekday is the Weekday will be set, eg: 4
     * @param hour is the Hour will be set, eg: 0
     * @param minute is the Minute will be set, eg: 0
     * @param second is the Second will be set, eg: 0
     */
    //% blockId="DS1307_SET_DATETIME" block="set year %year|month %month|day %day|weekday %weekday|hour %hour|minute %minute|second %second"
    //% weight=60 blockGap
    //% parts=DS1307 trackArgs=0
    export function DateTime(year: number, month: number, day: number, weekday: number, hour: number, minute: number, second: number): void {
        let buf = pins.createBuffer(8);
        buf[0] = DS1307_REG_SECOND;
        buf[1] = DecToHex(second % 60);
        buf[2] = DecToHex(minute % 60);
        buf[3] = DecToHex(hour % 24);
        buf[4] = DecToHex(weekday % 8);
        buf[5] = DecToHex(day % 32);
        buf[6] = DecToHex(month % 13);
        buf[7] = DecToHex(year % 100);
        pins.i2cWriteBuffer(DS1307_I2C_ADDR, buf)
    }

}
