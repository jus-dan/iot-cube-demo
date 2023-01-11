function Registriere_IoT_Cube (CubeNummer: number) {
    if (CubeNummer == 1) {
        IoTCube.OTAA_Setup(
        "0000000000000006",
        "AC1F09FFFE083852",
        "8B99F3EDC572772101EABF0C878B2B92",
        eBands.EU868,
        "A"
        )
    }
    if (CubeNummer == 2) {
        IoTCube.OTAA_Setup(
        "0000000000000001",
        "70B3D57ED005949E",
        "C34C16032D2016CC2310BE2380E9F6B5",
        eBands.EU868,
        "A"
        )
    }
    basic.pause(1000)
    IoTCube.LoRa_Join(
    eBool.enable,
    eBool.enable,
    10,
    8
    )
}
Registriere_IoT_Cube(1)
let höchste_Lautstärke = 0
let strip = neopixel.create(DigitalPin.P2, 10, NeoPixelMode.RGB)
loops.everyInterval(10000, function () {
    basic.showIcon(IconNames.SmallSquare)
    IoTCube.addTemperature(input.temperature(), Channels.One)
    IoTCube.addAnalogInput(höchste_Lautstärke, Channels.One)
    IoTCube.SendBuffer(IoTCube.getCayenne(), Channels.One)
    basic.showIcon(IconNames.SmallDiamond)
    basic.showNumber(höchste_Lautstärke)
    höchste_Lautstärke = 0
})
basic.forever(function () {
    strip.showBarGraph(input.soundLevel(), 255)
    strip.show()
    if (input.soundLevel() > höchste_Lautstärke) {
        höchste_Lautstärke = input.soundLevel()
    }
})
