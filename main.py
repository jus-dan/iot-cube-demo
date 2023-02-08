def Registriere_IoT_Cube(CubeNummer: number):
    if CubeNummer == 1:
        IoTCube.OTAA_Setup("0000000000000006",
            "AC1F09FFFE083852",
            "8B99F3EDC572772101EABF0C878B2B92",
            eBands.EU868,
            "A")
    if CubeNummer == 2:
        IoTCube.OTAA_Setup("0000000000000001",
            "70B3D57ED005949E",
            "C34C16032D2016CC2310BE2380E9F6B5",
            eBands.EU868,
            "A")
    if CubeNummer == 3:
        IoTCube.OTAA_Setup("0000000000000006",
            "AC1F09FFFE083809",
            "52A4E4802669CD3D89CCC04695B7D274",
            eBands.EU868,
            "A")
    basic.pause(1000)
    IoTCube.LoRa_Join(eBool.ENABLE, eBool.ENABLE, 10, 8)
Registriere_IoT_Cube(1)
höchste_Lautstärke = 0
strip = neopixel.create(DigitalPin.P2, 10, NeoPixelMode.RGB)

def on_every_interval():
    global höchste_Lautstärke
    basic.show_icon(IconNames.SMALL_SQUARE)
    IoTCube.add_temperature(input.temperature(), Channels.ONE)
    IoTCube.add_analog_input(höchste_Lautstärke, Channels.ONE)
    IoTCube.send_buffer(IoTCube.get_cayenne(), Channels.ONE)
    basic.show_icon(IconNames.SMALL_DIAMOND)
    basic.show_number(höchste_Lautstärke)
    höchste_Lautstärke = 0
loops.every_interval(10000, on_every_interval)

def on_forever():
    global höchste_Lautstärke
    strip.show_bar_graph(input.sound_level(), 255)
    strip.show()
    if input.sound_level() > höchste_Lautstärke:
        höchste_Lautstärke = input.sound_level()
basic.forever(on_forever)
