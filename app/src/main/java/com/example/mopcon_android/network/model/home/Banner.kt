package com.example.mopcon_android.network.model.home


import com.squareup.moshi.Json

data class Banner(
    @Json(name = "img")
    val img: String,
    @Json(name = "link")
    val link: String
)