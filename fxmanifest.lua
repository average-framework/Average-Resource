fx_version 'cerulean'
games { 'rdr3' }
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

author 'bub.bl'
description 'Average Framework (avg)'
repository 'https://github.com/'
version '0.0.1'

-- clr_disable_task_scheduler 'yes'

files {
    -- UI --
    'ui/**.png',
    'ui/**.jpg',
    'ui/**.svg',
    'ui/**.css',
    'ui/**.less',
    'ui/**.js',
    'ui/**.ttf',
    'ui/**.otf',
    'ui/**.html',

    -- DEPENDENCIES --
    'MySql.Data.dll',
    'MongoDB.Bson.dll',
    'Newtonsoft.Json.dll',

    -- FRAMEWORK --
    'Average.Shared.net.dll',
    'Average.Client.net.dll',
    'Average.Server.net.dll',

    -- GLOBAL CONFIGS / UTILS --
    'languages/*.json',
    'configs/*.json',
    'utilities/*.json',
    '*.json',
}

server_scripts {
    -- Average Framework (DO NOT REMOVE !!!)
    'Average.Shared.net.dll',
    'Average.Server.net.dll'
    ----------------------------------------
}

client_scripts {
    -- Average Framework (DO NOT REMOVE !!!)
    'Average.Shared.net.dll',
    'Average.Client.net.dll',
    'getEventData.js'
    ----------------------------------------
}

ui_page 'ui/index.html'

exports {
    "EstablishCall",
    "EndCall",

    "SetPlayerRadioSpeaker",
    "SetPlayerRadioChannel",
    "RemovePlayerRadioChannel",
    "SetRadioTowers",

    "GetEventEntityDamaged"
}

VoiceEnabled "true"
ServerUniqueIdentifier "WAolr/VOMVse0fHyRLQ8Y+JxsVw="
RequiredUpdateBranch ""
MinimumPluginVersion ""
SoundPack "default"
IngameChannelId "5"
IngameChannelPassword "averageteam"
SwissChannelIds "61,62"