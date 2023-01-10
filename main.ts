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
let _4digit = grove.createDisplay(DigitalPin.P2, DigitalPin.P16)
_4digit.show(1234)
loops.everyInterval(10000, function () {
    if (IoTCube.getStatus(eSTATUS_MASK.JOINED)) {
        basic.showIcon(IconNames.SmallSquare)
        _4digit.show(grove.measureInCentimetersV2(DigitalPin.P1))
        IoTCube.addTemperature(input.temperature(), Channels.One)
        IoTCube.addAnalogInput(grove.measureInCentimetersV2(DigitalPin.P1), Channels.Two)
        IoTCube.addIlluminance(pins.analogReadPin(AnalogPin.P2), Channels.Three)
        IoTCube.SendBuffer(IoTCube.getCayenne(), Channels.One)
        basic.showIcon(IconNames.SmallDiamond)
    } else {
        basic.showIcon(IconNames.Skull)
    }
})
