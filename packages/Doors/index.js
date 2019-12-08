const doors = [
    // Banks
    {id: 0,  name: 'Zentralbank Haupttür 1 Rechts',                     hash: 110411286,    locked: true, position: new mp.Vector3(232.6054, 214.1584, 106.4049),    controlposition: new mp.Vector3(232.6054, 214.1584, 106.4049),      fraktion: 'world',      fraktionsRang: 'none'},   // Right
    {id: 1,  name: 'Zentralbank Haupttür 1 Links',                     hash: 110411286,    locked: true, position: new mp.Vector3(231.5123, 216.5177, 106.4049),    controlposition: new mp.Vector3(231.5123, 216.5177, 106.4049),      fraktion: 'world',      fraktionsRang: 'none'},   // Left
    {id: 2,  name: 'Zentralbank Haupttür 2 Rechts',                     hash: 110411286,    locked: true, position: new mp.Vector3(260.6432, 203.2052, 106.4049),    controlposition: new mp.Vector3(260.6432, 203.2052, 106.4049),      fraktion: 'world',      fraktionsRang: 'none'},   // Right
    {id: 3,  name: 'Zentralbank Haupttür 2 Links',                     hash: 110411286,    locked: true, position: new mp.Vector3(258.2022, 204.1005, 106.4049),    controlposition: new mp.Vector3(258.2022, 204.1005, 106.4049),      fraktion: 'world',      fraktionsRang: 'none'},   // Left
    {id: 4,  name: 'Zentralbank Tür nach oben',                hash: 1956494919,   locked: true, position: new mp.Vector3(237.7704, 227.87, 106.426),       controlposition: new mp.Vector3(237.7704, 227.87, 106.426),         fraktion: 'world',      fraktionsRang: 'none'},
    {id: 5,  name: 'Zentralbank obere Tür',                   hash: 1956494919,   locked: true, position: new mp.Vector3(236.5488, 228.3147, 110.4328),    controlposition: new mp.Vector3(236.5488, 228.3147, 110.4328),      fraktion: 'world',      fraktionsRang: 'none'},
    {id: 6,  name: 'Zentralbank hintere Hallentür Rechts',             hash: 110411286,    locked: true, position: new mp.Vector3(259.9831, 215.2468, 106.4049),    controlposition: new mp.Vector3(259.9831, 215.2468, 106.4049),      fraktion: 'world',      fraktionsRang: 'none'},   // Right
    {id: 7,  name: 'Zentralbank hintere Hallentür Links',             hash: 110411286,    locked: true, position: new mp.Vector3(259.0879, 212.8062, 106.4049),    controlposition: new mp.Vector3(259.0879, 212.8062, 106.4049),      fraktion: 'world',      fraktionsRang: 'none'},   // Left
    {id: 8,  name: 'Zentralbank Bürotrakt Tür',        hash: 1956494919,   locked: true, position: new mp.Vector3(256.6172, 206.1522, 110.4328),    controlposition: new mp.Vector3(256.6172, 206.1522, 110.4328),      fraktion: 'world',      fraktionsRang: 'none'},
    {id: 9,  name: 'Zentralbank Großes Büro Tür',                hash: 964838196,    locked: true, position: new mp.Vector3(260.8579, 210.4453, 110.4328),    controlposition: new mp.Vector3(260.8579, 210.4453, 110.4328),      fraktion: 'world',      fraktionsRang: 'none'},
    {id: 10, name: 'Zentralbank Kleines Büro',              hash: 964838196,    locked: true, position: new mp.Vector3(262.5366, 215.0576, 110.4328),    controlposition: new mp.Vector3(262.5366, 215.0576, 110.4328),      fraktion: 'world',      fraktionsRang: 'none'},
    {id: 11, name: 'Zentralbank Safe Tür',                      hash: 961976194,    locked: true, position: new mp.Vector3(254.230, 224.55, 101.87),         controlposition: new mp.Vector3(254.230, 224.55, 101.87),           fraktion: 'world',      fraktionsRang: 'none'},

    // Shops
    {id: 100, name: 'Discount Store South Tür Rechts',                     hash: -1148826190,  locked: true, position: new mp.Vector3(82.38156, -1390.476, 29.52609),   controlposition: new mp.Vector3(82.38156, -1390.476, 29.52609),     fraktion: 'world',      fraktionsRang: 'none'},   // Right
    {id: 101, name: 'Discount Store South Tür Links',                     hash: 868499217,    locked: true, position: new mp.Vector3(82.38156, -1390.752, 29.52609),   controlposition: new mp.Vector3(82.38156, -1390.752, 29.52609),     fraktion: 'world',      fraktionsRang: 'none'},   // Left
    {id: 110, name: 'Los Santos Customs Popular Street',              hash: 270330101,    locked: true, position: new mp.Vector3(723.116, -1088.831, 23.23201),    controlposition: new mp.Vector3(723.116, -1088.831, 23.23201),      business: 'Los Santos Customs',        fraktionsRang: 'alle'},
    {id: 111, name: 'Los Santos Customs Carcer Way',                  hash: -550347177,   locked: true, position: new mp.Vector3(-356.0905, -134.7714, 40.01295),  controlposition: new mp.Vector3(-356.0905, -134.7714, 40.01295),    business: 'Los Santos Customs',        fraktionsRang: 'alle'},
    {id: 112, name: 'Los Santos Customs Greenwich Parkway',           hash: -550347177,   locked: true, position: new mp.Vector3(-1145.898, -1991.144, 14.18357),  controlposition: new mp.Vector3(-1145.898, -1991.144, 14.18357),    business: 'Los Santos Customs', businessRang: 'alle'},
    {id: 113, name: 'Los Santos Customs Route 68 Tür Rechts',                   hash: -822900180,   locked: true, position: new mp.Vector3(1174.656, 2644.159, 40.50673),    controlposition: new mp.Vector3(1174.656, 2644.159, 40.50673),      business: 'Los Santos Customs',        fraktionsRang: 'alle'},    // Right
    {id: 114, name: 'Los Santos Customs Route 68 Tür Links',                   hash: -822900180,   locked: true, position: new mp.Vector3(1182.307, 2644.166, 40.50784),    controlposition: new mp.Vector3(1182.307, 2644.166, 40.50784),      business: 'Los Santos Customs',        fraktionsRang: 'alle'},    // Left
    {id: 115, name: 'Los Santos Customs Route 68 Bürotür Rechts',             hash: 1335311341,   locked: true, position: new mp.Vector3(1187.202, 2644.95, 38.55176),     controlposition: new mp.Vector3(1187.202, 2644.95, 38.55176),       business: 'Los Santos Customs',        fraktionsRang: 'alle'},
    {id: 116, name: 'Los Santos Customs Route 68 Bürotür Links',             hash: 1544229216,   locked: true, position: new mp.Vector3(1182.646, 2641.182, 39.31031),    controlposition: new mp.Vector3(1182.646, 2641.182, 39.31031),      business: 'Los Santos Customs',        fraktionsRang: 'alle'},
    {id: 117, name: 'Beekers Garage Tor Tür Rechts',                     hash: -822900180,   locked: true, position: new mp.Vector3(114.3135, 6623.233, 32.67305),    controlposition: new mp.Vector3(114.3135, 6623.233, 32.67305),      business: 'Beekers Garage & Part',    fraktionsRang: 'alle'},    // Right
    {id: 118, name: 'Beekers Garage Tor Links',                     hash: -822900180,   locked: true, position: new mp.Vector3(108.8502, 6617.877, 32.67305),    controlposition: new mp.Vector3(108.8502, 6617.877, 32.67305),      business: 'Beekers Garage & Part',    fraktionsRang: 'alle'},    // Left
    {id: 119, name: 'Beekers Garage Bürotür',               hash: 1335311341,   locked: true, position: new mp.Vector3(105.1518, 6614.655, 32.58521),    controlposition: new mp.Vector3(105.1518, 6614.655, 32.58521),      business: 'Beekers Garage & Part',    fraktionsRang: 'alle'},
    {id: 120, name: 'Beekers Garage Lackierkabine',             hash: 1544229216,   locked: true, position: new mp.Vector3(105.7772, 6620.532, 33.34266),    controlposition: new mp.Vector3(105.7772, 6620.532, 33.34266),      business: 'Beekers Garage & Part',    fraktionsRang: 'alle'},
    {id: 121, name: 'Ammu Nation Vespucci Boulevard Tür Rechts',                hash: -8873588,     locked: true, position: new mp.Vector3(842.7685, -1024.539, 28.34478),   controlposition: new mp.Vector3(842.7685, -1024.539, 28.34478),     fraktion: 'ammu',       fraktionsRang: 'alle'},   // Right
    {id: 122, name: 'Ammu Nation Vespucci Boulevard Tür Links',                hash: 97297972,     locked: true, position: new mp.Vector3(845.3694, -1024.539, 28.34478),   controlposition: new mp.Vector3(845.3694, -1024.539, 28.34478),     fraktion: 'ammu',       fraktionsRang: 'alle'},   // Left
    {id: 123, name: 'Ammu Nation Lindsay Circus Tür Rechts',                    hash: -8873588,     locked: true, position: new mp.Vector3(-662.6415, -944.3256, 21.97915),  controlposition: new mp.Vector3(-662.6415, -944.3256, 21.97915),    fraktion: 'ammu',       fraktionsRang: 'alle'},  // Right
    {id: 124, name: 'Ammu Nation Lindsay Circus Tür Links',                    hash: 97297972,     locked: true, position: new mp.Vector3(-665.2424, -944.3256, 21.97915),  controlposition: new mp.Vector3(-665.2424, -944.3256, 21.97915),    fraktion: 'ammu',       fraktionsRang: 'alle'},  // Left
    {id: 125, name: 'Ammu Nation Popular Street Tür Rechts',                    hash: -8873588,     locked: true, position: new mp.Vector3(810.5769, -2148.27, 29.76892),    controlposition: new mp.Vector3(810.5769, -2148.27, 29.76892),      business: 'Ammunation',       fraktionsRang: 'alle'},    // Right
    {id: 126, name: 'Ammu Nation Popular Street Tür Links',                    hash: 97297972,     locked: true, position: new mp.Vector3(813.1779, -2148.27, 29.76892),    controlposition: new mp.Vector3(813.1779, -2148.27, 29.76892),      business: 'Ammunation',       fraktionsRang: 'alle'},     // Left
    {id: 128, name: 'Ammu Nation Popular Street Tür Rechts',                    hash: -8873588,     locked: true, position: new mp.Vector3(18.572, -1115.495, 29.94694),     controlposition: new mp.Vector3(18.572, -1115.495, 29.94694),       business: 'Ammunation',       businessRang: 'alle'},    // Right
    {id: 129, name: 'Ammu Nation Popular Street Tür Links',                    hash: 97297972,     locked: true, position: new mp.Vector3(16.12787, -1114.606, 29.94694),   controlposition: new mp.Vector3(16.12787, -1114.606, 29.94694),     business: 'Ammunation',       businessRang: 'alle'},     // Left
    {id: 130, name: 'Ammu Nation Adams Apple Boulevard',                   hash: 452874391,    locked: true, position: new mp.Vector3(6.81789, -1098.209, 29.94685),    controlposition: new mp.Vector3(6.81789, -1098.209, 29.94685),      business: 'Ammunation',       businessRang: 'alle'},
    {id: 131, name: 'Ammu Nation Vinewood Plaza Tür Rechts',                    hash: -8873588,     locked: true, position: new mp.Vector3(243.8379, -46.52324, 70.09098),   controlposition: new mp.Vector3(243.8379, -46.52324, 70.09098),     fraktion: 'ammu',       fraktionsRang: 'alle'},   // Right
    {id: 132, name: 'Ammu Nation Vinewood Plaza Tür Links',                    hash: 97297972,     locked: true, position: new mp.Vector3(244.7275, -44.07911, 70.09098),   controlposition: new mp.Vector3(244.7275, -44.07911, 70.09098),     fraktion: 'ammu',       fraktionsRang: 'alle'},   // Left
    {id: 150, name: 'Ponsonbys Portola Drive Tür Rechts',                        hash: -1922281023,  locked: true, position: new mp.Vector3(-715.6154, -157.2561, 37.67493),  controlposition: new mp.Vector3(-715.6154, -157.2561, 37.67493),    fraktion: 'world',      fraktionsRang: 'none'},  // Right
    {id: 151, name: 'Ponsonbys Portola Drive Tür Links',                        hash: -1922281023,  locked: true, position: new mp.Vector3(-716.6755, -155.42, 37.67493),    controlposition: new mp.Vector3(-716.6755, -155.42, 37.67493),      fraktion: 'world',      fraktionsRang: 'none'},    // Left
    {id: 152, name: 'Ponsonbys Portola Drive Tür Rechts',                        hash: -1922281023,  locked: true, position: new mp.Vector3(-1456.201, -233.3682, 50.05648),  controlposition: new mp.Vector3(-1456.201, -233.3682, 50.05648),    fraktion: 'world',      fraktionsRang: 'none'},  // Right
    {id: 153, name: 'Ponsonbys Portola Drive Tür Links',                        hash: -1922281023,  locked: true, position: new mp.Vector3(-1454.782, -231.7927, 50.05649),  controlposition: new mp.Vector3(-1454.782, -231.7927, 50.05649),    fraktion: 'world',      fraktionsRang: 'none'},  // Left
    {id: 154, name: 'Ponsonbys Rockford Plaza Tür Rechts',                       hash: -1922281023,  locked: true, position: new mp.Vector3(-156.439, -304.4294, 39.99308),   controlposition: new mp.Vector3(-156.439, -304.4294, 39.99308),     fraktion: 'world',      fraktionsRang: 'none'},   // Right
    {id: 155, name: 'Ponsonbys Rockford Plaza Tür Links',                       hash: -1922281023,  locked: true, position: new mp.Vector3(-157.1293, -306.4341, 39.99308),  controlposition: new mp.Vector3(-157.1293, -306.4341, 39.99308),    fraktion: 'world',      fraktionsRang: 'none'},  // Left
    {id: 156, name: 'Sub Urban Prosperity Street Promenade',          hash: 1780022985,   locked: true, position: new mp.Vector3(-1201.435, -776.8566, 17.99184),  controlposition: new mp.Vector3(-1201.435, -776.8566, 17.99184),    fraktion: 'world',      fraktionsRang: 'none'},
    {id: 157, name: 'Sub Urban Hawick Avenue',                        hash: 1780022985,   locked: true, position: new mp.Vector3(127.8201, -211.8274, 55.22751),   controlposition: new mp.Vector3(127.8201, -211.8274, 55.22751),     fraktion: 'world',      fraktionsRang: 'none'},
    {id: 158, name: 'Sub Urban Route 68',                             hash: 1780022985,   locked: true, position: new mp.Vector3(617.2458, 2751.022, 42.75777),    controlposition: new mp.Vector3(617.2458, 2751.022, 42.75777),      fraktion: 'world',      fraktionsRang: 'none'},
    {id: 159, name: 'Sub Urban Chumash Plaza',                        hash: 1780022985,   locked: true, position: new mp.Vector3(-3167.75, 1055.536, 21.53288),    controlposition: new mp.Vector3(-3167.75, 1055.536, 21.53288),      fraktion: 'world',      fraktionsRang: 'none'},
    {id: 160, name: 'Robs Liquor Route 1 Haupttür',                 hash: -1212951353,  locked: true, position: new mp.Vector3(-2973.535, 390.1414, 15.18735),   controlposition: new mp.Vector3(-2973.535, 390.1414, 15.18735),     fraktion: 'world',      fraktionsRang: 'none'},
    {id: 161, name: 'Robs Liquor Route 1 Personaltür',                  hash: 1173348778,   locked: true, position: new mp.Vector3(-2965.648, 386.7928, 15.18735),   controlposition: new mp.Vector3(-2965.648, 386.7928, 15.18735),     fraktion: 'world',      fraktionsRang: 'none'},
    {id: 162, name: 'Robs Liquor Route 1 Hintertür',                       hash: 1173348778,   locked: true, position: new mp.Vector3(-2961.749, 390.2573, 15.19322),   controlposition: new mp.Vector3(-2961.749, 390.2573, 15.19322),     fraktion: 'world',      fraktionsRang: 'none'},
    {id: 163, name: 'Robs Liquor Prosperity Street Haupttür',       hash: -1212951353,  locked: true, position: new mp.Vector3(-1490.411, -383.8453, 40.30745),  controlposition: new mp.Vector3(-1490.411, -383.8453, 40.30745),    fraktion: 'world',      fraktionsRang: 'none'},
    {id: 164, name: 'Robs Liquor Prosperity Street Personaltür',        hash: 1173348778,   locked: true, position: new mp.Vector3(-1482.679, -380.153, 40.30745),   controlposition: new mp.Vector3(-1482.679, -380.153, 40.30745),     fraktion: 'world',      fraktionsRang: 'none'},
    {id: 165, name: 'Robs Liquor Prosperity Street Hintertür',             hash: 1173348778,   locked: true, position: new mp.Vector3(-1482.693, -374.9365, 40.31332),  controlposition: new mp.Vector3(-1482.693, -374.9365, 40.31332),    fraktion: 'world',      fraktionsRang: 'none'},
    {id: 166, name: 'Robs Liquor San Andreas Avenue Haupttür',      hash: -1212951353,  locked: true, position: new mp.Vector3(-1226.894, -903.1218, 12.47039),  controlposition: new mp.Vector3(-1226.894, -903.1218, 12.47039),    fraktion: 'world',      fraktionsRang: 'none'},
    {id: 167, name: 'Robs Liquor San Andreas Avenue Personaltür',       hash: 1173348778,   locked: true, position: new mp.Vector3(-1224.755, -911.4182, 12.47039),  controlposition: new mp.Vector3(-1224.755, -911.4182, 12.47039),    fraktion: 'world',      fraktionsRang: 'none'},
    {id: 168, name: 'Robs Liquor San Andreas Avenue Hintertür',            hash: 1173348778,   locked: true, position: new mp.Vector3(-1219.633, -912.406, 12.47626),   controlposition: new mp.Vector3(-1219.633, -912.406, 12.47626),     fraktion: 'world',      fraktionsRang: 'none'},
    {id: 169, name: 'Robs Liquor El Rancho Boulevard Haupttür',     hash: -1212951353,  locked: true, position: new mp.Vector3(1141.038, -980.3225, 46.55986),   controlposition: new mp.Vector3(1141.038, -980.3225, 46.55986),     fraktion: 'world',      fraktionsRang: 'none'},
    {id: 170, name: 'Robs Liquor El Rancho Boulevard Personaltür',      hash: 1173348778,   locked: true, position: new mp.Vector3(1132.645, -978.6059, 46.55986),   controlposition: new mp.Vector3(1132.645, -978.6059, 46.55986),     fraktion: 'world',      fraktionsRang: 'none'},
    {id: 171, name: 'Robs Liquor El Rancho Boulevard Hintertür',           hash: 1173348778,   locked: true, position: new mp.Vector3(129.51, -982.7756, 46.56573),     controlposition: new mp.Vector3(129.51, -982.7756, 46.56573),       fraktion: 'world',      fraktionsRang: 'none'},
    {id: 180, name: 'Bob Mulét Barber Shop Tür Rechts',                          hash: 145369505,    locked: true, position: new mp.Vector3(-822.4442, -188.3924, 37.81895),  controlposition: new mp.Vector3(-822.4442, -188.3924, 37.81895),    fraktion: 'world',      fraktionsRang: 'none'},  // Right
    {id: 181, name: 'Bob Mulét Barber Shop Tür Links',                          hash: -1663512092,  locked: true, position: new mp.Vector3(-823.2001, -187.0831, 37.81895),  controlposition: new mp.Vector3(-823.2001, -187.0831, 37.81895),    fraktion: 'world',      fraktionsRang: 'none'},  // Left
    {id: 182, name: 'Hair on Hawick Barber Shop',                     hash: -1844444717,  locked: true, position: new mp.Vector3(-29.86917, -148.1571, 57.22648),  controlposition: new mp.Vector3(-29.86917, -148.1571, 57.22648),    fraktion: 'world',      fraktionsRang: 'none'},
    {id: 183, name: 'OSheas Barber Shop',                             hash: -1844444717,  locked: true, position: new mp.Vector3(1932.952, 3725.154, 32.9944),     controlposition: new mp.Vector3(1932.952, 3725.154, 32.9944),       fraktion: 'world',      fraktionsRang: 'none'},
    {id: 190, name: 'Premium Deluxe Motorsport Parking Tür Rechts',             hash: 1417577297,   locked: true, position: new mp.Vector3(-37.33113, -1108.873, 26.7198),   controlposition: new mp.Vector3(-37.33113, -1108.873, 26.7198),     fraktion: 'pdm',        fraktionsRang: 'alle'},   // Right
    {id: 191, name: 'Premium Deluxe Motorsport Parking Tür Links',             hash: 2059227086,   locked: true, position: new mp.Vector3(-39.13366, -1108.218, 26.7198),   controlposition: new mp.Vector3(-39.13366, -1108.218, 26.7198),     fraktion: 'pdm',        fraktionsRang: 'alle'},   // Left
    {id: 192, name: 'Premium Deluxe Motorsport Haupttür Rechts',                hash: 1417577297,   locked: true, position: new mp.Vector3(-60.54582, -1094.749, 26.88872),  controlposition: new mp.Vector3(-60.54582, -1094.749, 26.88872),    fraktion: 'pdm',        fraktionsRang: 'alle'},  // Right
    {id: 193, name: 'Premium Deluxe Motorsport Haupttür Links',       hash: 2059227086,   locked: true, position: new mp.Vector3(-59.89302, -1092.952, 26.88362),  controlposition: new mp.Vector3(-59.89302, -1092.952, 26.88362),    fraktion: 'pdm',        fraktionsRang: 'alle'},  // Left
    {id: 194, name: 'Premium Deluxe Motorsport Rechtes Büro',         hash: -2051651622,  locked: true, position: new mp.Vector3(-33.80989, -1107.579, 26.57225),  controlposition: new mp.Vector3(-33.80989, -1107.579, 26.57225),    fraktion: 'pdm',        fraktionsRang: 'alle'},
    {id: 195, name: 'Premium Deluxe Motorsport Linkes Büro',          hash: -2051651622,  locked: true, position: new mp.Vector3(-31.72353, -1101.847, 26.57225),  controlposition: new mp.Vector3(-31.72353, -1101.847, 26.57225),    fraktion: 'pdm',        fraktionsRang: 'alle'},

    // Houses
    {id: 300, name: 'Franklins Haus Haupttür',                           hash: 520341586,    locked: true, position: new mp.Vector3(-14.86892, -1441.182, 31.19323),  controlposition: new mp.Vector3(-14.86892, -1441.182, 31.19323),    fraktion: 'world',      fraktionsRang: 'none'},
    {id: 301, name: 'Franklins Haus Garagentor',                          hash: 703855057,    locked: true, position: new mp.Vector3(-25.2784, -1431.061, 30.83955),   controlposition: new mp.Vector3(-25.2784, -1431.061, 30.83955),     fraktion: 'world',      fraktionsRang: 'none'},

    // Police
    {id: 1000, name: 'Mission Row PD Haupttür Rechts',        hash: 320433149,    locked: true, position: new mp.Vector3(434.7479, -983.2151, 30.83926),   controlposition: new mp.Vector3(434.7479, -983.2151, 30.83926),     fraktion: 'LSPD',       fraktionsRang: 'alle'},  // Right
    {id: 1001, name: 'Mission Row PD Haupttür Links',        hash: -1215222675,  locked: true, position: new mp.Vector3(434.7479, -980.6184, 30.83926),   controlposition: new mp.Vector3(434.7479, -980.6184, 30.83926),     fraktion: 'LSPD',       fraktionsRang: 'alle'},  // Left
    {id: 1002, name: 'Mission Row PD Hintertür Rechts',        hash: -2023754432,  locked: true, position: new mp.Vector3(469.9679, -1014.452, 26.53623),   controlposition: new mp.Vector3(469.9679, -1014.452, 26.53623),     fraktion: 'LSPD',       fraktionsRang: 'alle'},  // Right
    {id: 1003, name: 'Mission Row PD Hintertür Links',        hash: -2023754432,  locked: true, position: new mp.Vector3(467.3716, -1014.452, 26.53623),   controlposition: new mp.Vector3(467.3716, -1014.452, 26.53623),     fraktion: 'LSPD',       fraktionsRang: 'alle'},  // Left
    {id: 1004, name: 'Mission Row PD Hintere Zellentür',      hash: -1033001619,  locked: true, position: new mp.Vector3(463.4782, -1003.538, 25.00599),   controlposition: new mp.Vector3(463.4782, -1003.538, 25.00599),     fraktion: 'LSPD',       fraktionsRang: 'alle'},
    {id: 1005, name: 'Mission Row PD Zelle 1',             hash: 631614199,    locked: true, position: new mp.Vector3(461.8065, -994.4086, 25.06443),   controlposition: new mp.Vector3(461.8065, -994.4086, 25.06443),     fraktion: 'LSPD',       fraktionsRang: 'alle'},
    {id: 1006, name: 'Mission Row PD Zelle 2',             hash: 631614199,    locked: true, position: new mp.Vector3(461.8065, -997.6583, 25.06443),   controlposition: new mp.Vector3(461.8065, -997.6583, 25.06443),     fraktion: 'LSPD',       fraktionsRang: 'alle'},
    {id: 1007, name: 'Mission Row PD Zelle 3',             hash: 631614199,    locked: true, position: new mp.Vector3(461.8065, -1001.302, 25.06443),   controlposition: new mp.Vector3(461.8065, -1001.302, 25.06443),     fraktion: 'LSPD',       fraktionsRang: 'alle'},
    {id: 1008, name: 'Mission Row PD Vordere Zellentür',      hash: 631614199,    locked: true, position: new mp.Vector3(464.5701, -992.6641, 25.06443),   controlposition: new mp.Vector3(464.5701, -992.6641, 25.06443),     fraktion: 'LSPD',       fraktionsRang: 'alle'},
    {id: 1009, name: 'Mission Row PD Chief Büro',    hash: -1320876379,  locked: true, position: new mp.Vector3(446.5728, -980.0106, 30.8393),    controlposition: new mp.Vector3(446.5728, -980.0106, 30.8393),      fraktion: 'LSPD',       fraktionsRang: 'alle'},
    {id: 1010, name: 'Mission Row PD Waffenkammer Vortür Rechts',      hash: 185711165,    locked: true, position: new mp.Vector3(450.1041, -984.0915, 30.8393),    controlposition: new mp.Vector3(450.1041, -984.0915, 30.8393),      fraktion: 'LSPD',       fraktionsRang: 'alle'},  // Right
    {id: 1011, name: 'Mission Row PD Waffenkammer Vortür Links',      hash: 185711165,    locked: true, position: new mp.Vector3(450.1041, -981.4915, 30.8393),    controlposition: new mp.Vector3(450.1041, -981.4915, 30.8393),      fraktion: 'LSPD',       fraktionsRang: 'alle'},  // Left
    {id: 1012, name: 'Mission Row PD Waffenkammer Sicherheitstür',      hash: 749848321,    locked: true, position: new mp.Vector3(453.0793, -983.1895, 30.83926),   controlposition: new mp.Vector3(453.0793, -983.1895, 30.83926),     fraktion: 'LSPD',       fraktionsRang: 'alle'},
    {id: 1013, name: 'Mission Row PD Personalgang Tür',       hash: 1557126584,   locked: true, position: new mp.Vector3(450.1041, -985.7384, 30.8393),    controlposition: new mp.Vector3(450.1041, -985.7384, 30.8393),      fraktion: 'LSPD',       fraktionsRang: 'alle'},
    {id: 1014, name: 'Mission Row PD Umkleide Tür',      hash: -2023754432,  locked: true, position: new mp.Vector3(452.6248, -987.3626, 30.8393),    controlposition: new mp.Vector3(452.6248, -987.3626, 30.8393),      fraktion: 'LSPD',       fraktionsRang: 'alle'},
    {id: 1015, name: 'Mission Row PD Dachzugangstür',        hash: 749848321,    locked: true, position: new mp.Vector3(461.2865, -985.3206, 30.83926),   controlposition: new mp.Vector3(461.2865, -985.3206, 30.83926),     fraktion: 'LSPD',       fraktionsRang: 'alle'},
    {id: 1016, name: 'Mission Row PD Dachtür',               hash: -340230128,   locked: true, position: new mp.Vector3(464.3613, -984.678, 43.83443),    controlposition: new mp.Vector3(464.3613, -984.678, 43.83443),      fraktion: 'LSPD',       fraktionsRang: 'alle'},
    {id: 1017, name: 'Mission Row PD Zellentrakt Rechts', hash: 185711165,    locked: true, position: new mp.Vector3(443.4078, -989.4454, 30.8393),    controlposition: new mp.Vector3(443.4078, -989.4454, 30.8393),      fraktion: 'LSPD',       fraktionsRang: 'alle'},  // Right
    {id: 1018, name: 'Mission Row PD Zellentrakt Links', hash: 185711165,    locked: true, position: new mp.Vector3(446.0079, -989.4454, 30.8393),    controlposition: new mp.Vector3(446.0079, -989.4454, 30.8393),      fraktion: 'LSPD',       fraktionsRang: 'alle'},  // Left
    {id: 1019, name: 'Mission Row PD Briefing Rechts',          hash: -131296141,   locked: true, position: new mp.Vector3(443.0298, -991.941, 30.8393),     controlposition: new mp.Vector3(443.0298, -991.941, 30.8393),       fraktion: 'LSPD',       fraktionsRang: 'alle'},   // Right
    {id: 1020, name: 'Mission Row PD Briefing Links',          hash: -131296141,   locked: true, position: new mp.Vector3(443.0298, -994.5412, 30.8393),    controlposition: new mp.Vector3(443.0298, -994.5412, 30.839),       fraktion: 'LSPD',       fraktionsRang: 'alle'},  // Left
    {id: 1021, name: 'Mission Row PD Hintertor',          hash: -1603817716,  locked: true, position: new mp.Vector3(488.8923, -1011.67, 27.14583),    controlposition: new mp.Vector3(488.1733, -1022.82, 28.07),         fraktion: 'LSPD',       fraktionsRang: 'alle'},
    {id: 510, name: 'Bolingbroke Penitentiary Schleuse 1',      hash:  741314661,   locked: true, position: new mp.Vector3(1844.998, 2597.482, 44.63626),    controlposition: new mp.Vector3(1845.55, 2603.43, 46.13),           fraktion: 'LSPD',       fraktionsRang: 'alle'},
    {id: 511, name: 'Bolingbroke Penitentiary Schleuse 2',     hash:  741314661,   locked: true, position: new mp.Vector3(1818.543, 2597.482, 44.60749),    controlposition: new mp.Vector3(1819.20, 2603.24, 45.59),           fraktion: 'LSPD',       fraktionsRang: 'alle'},
    {id: 512, name: 'Bolingbroke Penitentiary Schleuse 3',      hash:  741314661,   locked: true, position: new mp.Vector3(1806.939, 2616.975, 44.60093),    controlposition: new mp.Vector3(1804.77, 2616.97, 45.56),           fraktion: 'LSPD',       fraktionsRang: 'alle'},

  //Hospital Alt
  /*
	{id: 1500, name: 'Hospital OPs',      hash:  580361003,   locked: true, position: new mp.Vector3(-485.69, -330.82, -45.11),    controlposition: new mp.Vector3(-485.69, -330.82, -45.11),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
	{id: 1501, name: 'Hospital OPs zu Mitarbeiter',      hash:  -770740285,   locked: true, position: new mp.Vector3(-495.8, -324.49, -45.26),    controlposition: new mp.Vector3(-495.8, -324.49, -45.26),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
	{id: 1502, name: 'Hospital OP Saal 1 L',      hash:  580361003,   locked: true, position: new mp.Vector3(-493.83, -330.73, -44.95),    controlposition: new mp.Vector3(-493.83, -330.73, -44.95),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
	{id: 1503, name: 'Hospital OP Saal 1 R',      hash:  1415151278,   locked: true, position: new mp.Vector3(-496.39, -330.73, -44.95),    controlposition: new mp.Vector3(-496.39, -330.73, -44.95),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
	{id: 1504, name: 'Hospital OP Saal 2 L',      hash:  580361003,   locked: true, position: new mp.Vector3(-504.45, -330.68, -45.03),    controlposition: new mp.Vector3(-504.45, -330.68, -45.03),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
	{id: 1505, name: 'Hospital OP Saal 2 R',      hash:  1415151278,   locked: true, position: new mp.Vector3(-507.01, -330.69, -45.03),    controlposition: new mp.Vector3(-507.01, -330.69, -45.03),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
	{id: 1506, name: 'Hospital Büro 1',      hash:  1335309163,   locked: true, position: new mp.Vector3(-459.64, -303.24, -45.17),    controlposition: new mp.Vector3(-459.64, -303.24, -45.17),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
	{id: 1507, name: 'Hospital Büro 2',      hash:  1335309163,   locked: true, position: new mp.Vector3(-459.64, -305.93, -45.14),    controlposition: new mp.Vector3(-459.64, -305.93, -45.14),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
  {id: 1508, name: 'Hospital Büro 3',      hash:  1335309163,   locked: true, position: new mp.Vector3(-459.72, -316.0, -45.14),    controlposition: new mp.Vector3(-459.72, -316.0, -45.14),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
  */

  //Hospital Neu
  {id: 1500, name: 'Hospital Labor',      hash: -1572101598 ,   locked: true, position: new mp.Vector3(-471.6902, -334.4426, -149.9613),    controlposition: new mp.Vector3(-471.6902, -334.4426, -149.9613),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
	{id: 1501, name: 'Hospital OP 1',      hash:  -1572101598,   locked: true, position: new mp.Vector3(-446.68, -323.0707, -149.9379),    controlposition: new mp.Vector3(-446.68, -323.0707, -149.9379),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
	{id: 1502, name: 'Hospital OP 2',      hash:  -1572101598,   locked: true, position: new mp.Vector3(-446.68, -331.24173, -149.9644),    controlposition: new mp.Vector3(-446.68, -331.24173, -149.9644),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
	{id: 1503, name: 'Hospital Warteraum',      hash:  -538477509,   locked: true, position: new mp.Vector3(-449.77, -347.62, -148.77),    controlposition: new mp.Vector3(-449.77, -347.62, -148.77),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
	{id: 1504, name: 'Hospital Büro 2',      hash:  -952356348,   locked: true, position: new mp.Vector3(-445.153961, -350.4, -148.77),    controlposition: new mp.Vector3(-445.153961, -350.4, -148.77),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
	{id: 1505, name: 'Hospital Büro 1',      hash:  -952356348,   locked: true, position: new mp.Vector3(-435.713959, -350.4, -148.75),    controlposition: new mp.Vector3(-435.713959, -350.4, -148.75),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
	{id: 1506, name: 'Hospital Patienten Zimmer',      hash:  224975209,   locked: false, position: new mp.Vector3(-461.6, -329.82, -149.01),    controlposition: new mp.Vector3(-461.6, -329.82, -149.01),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
	{id: 1507, name: 'Hospital Patienten Zimmer',      hash:  224975209,   locked: false, position: new mp.Vector3(-461.6, -321.48, -149.01),    controlposition: new mp.Vector3(-461.6, -321.48, -149.01),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
	{id: 1508, name: 'Hospital Patienten Zimmer',      hash:  224975209,   locked: false, position: new mp.Vector3(-461.6, -313.14, -149.01),    controlposition: new mp.Vector3(-461.6, -313.14, -149.01),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
  {id: 1509, name: 'Hospital Intensiv',      hash:  -1572101598,   locked: true, position: new mp.Vector3(-462.6811, -337.76, -149.9503),    controlposition: new mp.Vector3(-462.6811, -337.76, -149.9503),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
  {id: 1510, name: 'Hospital Umkleide',      hash:  827574885,   locked: true, position: new mp.Vector3(-471.43, -353.46, -148.8584),    controlposition: new mp.Vector3(-471.43, -353.46, -148.8584),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
  {id: 1511, name: 'Hospital Toilette',      hash:  827574885,   locked: true, position: new mp.Vector3(-474.18, -335.35, -148.84),    controlposition: new mp.Vector3(-474.18, -335.35, -148.84),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
  {id: 1512, name: 'Hospital Pausenraum',      hash:  1639387890,   locked: true, position: new mp.Vector3(-472.12, -337.59, -148.77),    controlposition: new mp.Vector3(-472.12, -337.59, -148.77),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
  {id: 1513, name: 'Hospital Behandlung 1',      hash:  1415151278,   locked: true, position: new mp.Vector3(-458.56, -331.2, -148.7686),    controlposition: new mp.Vector3(-458.56, -331.2, -148.7686),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
  {id: 1514, name: 'Hospital Behandlung 2',      hash:  1415151278,   locked: true, position: new mp.Vector3(-458.56, -323.04, -148.768631),    controlposition: new mp.Vector3(-458.56, -323.04, -148.768631),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
  {id: 1515, name: 'Hospital Behandlung 3',      hash:  1415151278,   locked: true, position: new mp.Vector3(-458.56, -314.95, -148.768631),    controlposition: new mp.Vector3(-458.56, -314.95, -148.768631),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
  {id: 1516, name: 'Hospital Fahrstuhltuer Links',      hash:  -726591477,   locked: true, position: new mp.Vector3(-432.2975, -340.2277, -149.9686),    controlposition: new mp.Vector3(-432.2975, -340.2277, -149.9686),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
  {id: 1517, name: 'Hospital Fahrstuhltuer Rechts',      hash: -726591477,   locked: true, position: new mp.Vector3(-432.3, -337.2922, -149.9649),    controlposition: new mp.Vector3(-432.3, -337.2922, -149.9649),           fraktion: 'LSMC',       fraktionsRang: 'alle'},
  {id: 1518, name: 'Hospital Leichenhalle',      hash:  -1572101598,   locked: true, position: new mp.Vector3(-446.6893, -314.9495, -149.923569),    controlposition: new mp.Vector3(-446.6893, -314.9495, -149.923569),           fraktion: 'LSMC',       fraktionsRang: 'alle'},


  // Others
    {id: 500, name: 'Vanilla Unicorn Haupttür',                     hash: -1116041313,  locked: true, position: new mp.Vector3(127.9552, -1298.503, 29.41962),   controlposition: new mp.Vector3(127.9552, -1298.503, 29.41962),     business: 'Vanilla Unicorn',      businessang: 'alle'},
    {id: 501, name: 'Vanilla Unicorn Hintertür',                     hash: 668467214,    locked: true, position: new mp.Vector3(96.09197, -1284.854, 29.43878),   controlposition: new mp.Vector3(96.09197, -1284.854, 29.43878),     business: 'Vanilla Unicorn',      businessRang: 'alle'},
    {id: 502, name: 'Vanilla Unicorn Bürotür',                         hash: -626684119,   locked: true, position: new mp.Vector3(99.08321, -1293.701, 29.41868),   controlposition: new mp.Vector3(99.08321, -1293.701, 29.41868),     business: 'Vanilla Unicorn',      businessRang: 'alle'},
    {id: 503, name: 'Vanilla Unicorn Umkleidetür',                          hash: -495720969,   locked: true, position: new mp.Vector3(113.9822, -1297.43, 29.41868),    controlposition: new mp.Vector3(113.9822, -1297.43, 29.41868),      business: 'Vanilla Unicorn',      businessRang: 'alle'},
    {id: 504, name: 'Vanilla Unicorn Privaträumetür',                  hash: -1881825907,  locked: true, position: new mp.Vector3(116.0046, -1294.692, 29.41947),   controlposition: new mp.Vector3(116.0046, -1294.692, 29.41947),     business: 'Vanilla Unicorn',      businessRang: 'alle'},

    {id: 1300, name: 'Bennys Straßentor West',                          hash: -1603817716, locked: true, position: new mp.Vector3(-121.571526, -1299.689, 28.3419), controlposition: new mp.Vector3(-121.571526, -1299.689, 28.3419), business: 'Bennys Werkstatt', businessRang: 'alle'},
    {id: 1301, name: 'Bennys Tor',                          hash: 3867468406, locked: true, position: new mp.Vector3(-205.6828, -1310.683, 30.29572), controlposition: new mp.Vector3(-205.6828, -1310.683, 30.29572), business: 'Bennys Werkstatt', businessRang: 'alle'},
    {id: 1700, name: 'Tequi-La-La Bar Eingang',                          hash: 993120320, locked: true, position: new mp.Vector3(-565.1712, 276.6259, 83.28626), controlposition: new mp.Vector3(-565.1712, 276.6259, 83.28626), business: 'Tequilala', businessRang: 'alle'},
    {id: 1701, name: 'Tequi-La-La Bar Hintereingang',                          hash: 993120320, locked: true, position: new mp.Vector3(-561.2866, 293.5044, 87.77851), controlposition: new mp.Vector3(-561.2866, 293.5044, 87.77851), business: 'Tequilala', businessRang: 'alle'},
    {id: 1702, name: 'Tequi-La-La Bar Nach unten',                          hash: 3668283177, locked: true, position: new mp.Vector3(-560.2373, 293.0106, 82.32609), controlposition: new mp.Vector3(-560.2373, 293.0106, 82.32609), business: 'Tequilala', businessRang: 'alle'},

    //Lost MC
    {id: 1703, name: 'Lost-MC-Clubhaus Tür1',                          hash: 190770132, locked: false, position: new mp.Vector3(981.793, -103.035, 74.84), controlposition: new mp.Vector3(981.793, -103.035, 74.84), fraktion: 'world', fraktionsRang: 'none'},
    {id: 1704, name: 'Lost-MC-Clubhaus Tür2',                          hash: 1466939863, locked: false, position: new mp.Vector3(-7.555054, -3.766403, -0.9390259), controlposition: new mp.Vector3(-7.555054, -3.766403, -0.9390259), fraktion: 'world', businessRang: 'none'},

    //The Pit
    {id: 1801, name: 'The Pit Tattoo',                          hash: 543652229, locked: true, position: new mp.Vector3(-1155.454, -1424.008, 5.046147), controlposition: new mp.Vector3(-1155.454, -1424.008, 5.046147), business: 'The Pit', businessRang: 'alle'},

    //Blazing Tattoo
    {id: 1901, name: 'Blazing Tattoo',                          hash: 543652229, locked: true, position: new mp.Vector3(321.8085, 178.3599, 103.6782), controlposition: new mp.Vector3(321.8085, 178.3599, 103.6782), business: 'Blazing Tattoo', businessRang: 'alle'},
    {id: 1902, name: 'Blazing Tattoo Toilettentür',                          hash: -122922994, locked: true, position: new mp.Vector3(334.74, 178.64, -193.78), controlposition: new mp.Vector3(334.74, 178.64, -193.78), business: 'Blazing Tattoo', businessRang: 'alle'},

    //Tattoo Studio Ink Inc.
    {id: 2001, name: 'Tattoo Studio Ink Inc.',                          hash: 543652229, locked: true, position: new mp.Vector3(-3167.789, 1074.867, 20.92086), controlposition: new mp.Vector3(-3167.789, 1074.867, 20.92086), business: 'Tattoo Studio Ink Inc.', businessRang: 'alle'},

    //Legal & Care
    {id: 2100, name: 'Legal Care Tor Rechts',                          hash: 3945237283, locked: true, position: new mp.Vector3(-827.2946, -29.03375, 38.8490), controlposition: new mp.Vector3(-827.2946, -29.03375, 38.8490), business: 'Legal Care', businessRang: 'alle'}, //Right
    {id: 2101, name: 'Legal Care Tor Links',                          hash: 2376486946, locked: true, position: new mp.Vector3(-824.6462, -33.83021, 38.84176), controlposition: new mp.Vector3(-824.6462, -33.83021, 38.84176), business: 'Legal Care', businessRang: 'alle'}, //Left
    {id: 2102, name: 'Legal Care Büro Tür 1',                          hash: -952356348, locked: true, position: new mp.Vector3(-859.66, -8.1, -85.28), controlposition: new mp.Vector3(-859.66, -8.1, -85.28), business: 'Legal Care', businessRang: 'alle'},
    {id: 2103, name: 'Legal Care Büro Tür 2',                          hash: -952356348, locked: true, position: new mp.Vector3(-851.3, -6.84, -85.28), controlposition: new mp.Vector3(-851.3, -6.84, -85.28), business: 'Legal Care', businessRang: 'alle'},
    {id: 2104, name: 'Legal Care Chefbüro Tür',                          hash: 1639387890, locked: true, position: new mp.Vector3(-851.21, 1.25, -82.37), controlposition: new mp.Vector3(-851.21, 1.25, -82.37), business: 'Legal Care', businessRang: 'alle'},

  ];

var doorStates = {};
doorStates[0] = false;
doorStates[1] = false;
doorStates[2] = false;
doorStates[3] = false;
doorStates[4] = true;
doorStates[5] = true;
doorStates[6] = false;
doorStates[7] = false;
doorStates[8] = true;
doorStates[9] = true;
doorStates[10] = true;
doorStates[11] = true;
doorStates[100] = false;
doorStates[101] = false;
doorStates[110] = true;
doorStates[111] = true;
doorStates[112] = true;
doorStates[113] = true;
doorStates[114] = true;
doorStates[115] = true;
doorStates[116] = true;
doorStates[117] = false;
doorStates[118] = false;
doorStates[119] = false;
doorStates[120] = false;
doorStates[121] = false;
doorStates[122] = false;
doorStates[123] = false;
doorStates[124] = false;
doorStates[125] = false;
doorStates[126] = false;
doorStates[128] = false;
doorStates[129] = false;
doorStates[130] = false;
doorStates[131] = false;
doorStates[132] = false;
doorStates[150] = false;
doorStates[151] = false;
doorStates[152] = false;
doorStates[153] = false;
doorStates[154] = false;
doorStates[155] = false;
doorStates[156] = false;
doorStates[157] = false;
doorStates[158] = false;
doorStates[159] = false;
doorStates[160] = false;
doorStates[161] = false;
doorStates[162] = false;
doorStates[163] = false;
doorStates[164] = false;
doorStates[165] = false;
doorStates[166] = false;
doorStates[167] = false;
doorStates[168] = false;
doorStates[169] = false;
doorStates[170] = false;
doorStates[171] = false;
doorStates[180] = false;
doorStates[181] = false;
doorStates[182] = false;
doorStates[183] = false;
doorStates[190] = false;
doorStates[191] = false;
doorStates[192] = false;
doorStates[193] = false;
doorStates[194] = false;
doorStates[195] = false;
doorStates[300] = true;
doorStates[301] = true;
doorStates[500] = true;
doorStates[501] = true;
doorStates[502] = true;
doorStates[503] = true;
doorStates[504] = true;
doorStates[510] = true;
doorStates[511] = true;
doorStates[512] = true;
doorStates[1000] = true;
doorStates[1001] = true;
doorStates[1002] = true;
doorStates[1003] = true;
doorStates[1004] = true;
doorStates[1005] = true;
doorStates[1006] = true;
doorStates[1007] = true;
doorStates[1008] = true;
doorStates[1009] = true;
doorStates[1010] = true;
doorStates[1011] = true;
doorStates[1012] = true;
doorStates[1013] = true;
doorStates[1014] = true;
doorStates[1015] = true;
doorStates[1016] = true;
doorStates[1017] = true;
doorStates[1018] = true;
doorStates[1019] = true;
doorStates[1020] = true;
doorStates[1021] = true;
doorStates[1300] = true;
doorStates[1301] = true;
doorStates[1500] = true;
doorStates[1501] = true;
doorStates[1502] = true;
doorStates[1503] = true;
doorStates[1504] = true;
doorStates[1505] = true;
doorStates[1506] = false;
doorStates[1507] = false;
doorStates[1508] = false;
doorStates[1509] = true;
doorStates[1510] = true;
doorStates[1511] = true;
doorStates[1512] = true;
doorStates[1513] = true;
doorStates[1514] = true;
doorStates[1515] = true;
doorStates[1516] = true;
doorStates[1517] = true;
doorStates[1518] = true;
doorStates[1700] = true;
doorStates[1701] = true;
doorStates[1702] = true;
doorStates[1703] = false;
doorStates[1704] = false;
doorStates[1801] = true;
doorStates[1901] = true;
doorStates[1902] = true;
doorStates[2001] = true;
doorStates[2100] = true;
doorStates[2101] = true;
doorStates[2102] = true;
doorStates[2103] = true;
doorStates[2104] = true;



mp.events.add("getDoors", (player) => {
  if(mp.players.exists(player)) {
    player.call("receiveDoors", [JSON.stringify(doors), JSON.stringify(doorStates)]);
  }
});

mp.events.add("checkDoorPermission", (player, door) => {
  if(mp.players.exists(player)) {
    var fractionData = player.data.fractionData;
    fractionData = JSON.parse(fractionData);
    door = JSON.parse(door);
    var businessData = player.data.businessData;
    businessData = JSON.parse(businessData);

    var check = false;
    if (door.business) {
      if ((businessData !== "arbeitslos" && businessData.businessName == door.business) || (fractionData !== "arbeitslos" && fractionData.fractionName == "NOOSE")) {
        check = true;
      }
    } else if (door.fraktion) {
      if ((fractionData !== "arbeitslos" && fractionData.fractionName == door.fraktion) || (fractionData !== "arbeitslos" && fractionData.fractionName == "NOOSE")) {
        check = true;
      }
    }

    if (check == true) {
      door.locked =! doorStates[door.id];
      doorStates[door.id] = door.locked;
      mp.players.call("changeDoorState", [JSON.stringify(door)]);
      mp.players.call("receiveDoors", [JSON.stringify(doors), JSON.stringify(doorStates)]);
      if(door.locked){
        player.call(`doorNotify`, ["~r~Du hast die Tür geschlossen"]);
      } else {
        player.call(`doorNotify`, ["~g~Du hast die Tür geöffnet"]);
      }
    }
  }
});