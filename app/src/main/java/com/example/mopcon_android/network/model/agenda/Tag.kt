package com.example.mopcon_android.network.model.agenda


import com.squareup.moshi.Json

data class Tag(
    @Json(name = "color")
    val color: Color,
    @Json(name = "name")
    val name: String
)