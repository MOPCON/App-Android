package com.example.mopcon_android.network.model.agenda


import com.squareup.moshi.Json

data class Img(
    @Json(name = "mobile")
    val mobile: String,
    @Json(name = "web")
    val web: String
)