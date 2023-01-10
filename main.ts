function Registriere_IoT_Cube (CubeNummer: number) {
    if (CubeNummer == 1) {
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
basic.forever(function () {
    if (IoTCube.checkEvent(eRAK_EVT.JOINED)) {
        basic.showIcon(IconNames.SmallSquare)
        IoTCube.addTemperature(pins.analogReadPin(AnalogPin.P0), Channels.One)
        IoTCube.SendBuffer(IoTCube.getCayenne(), Channels.One)
        basic.showIcon(IconNames.SmallDiamond)
        basic.pause(10000)
    } else {
        basic.showIcon(IconNames.Skull)
    }
})
