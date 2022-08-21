package com.example.mopcon_android.network.model.agenda


import com.squareup.moshi.Json

data class SponsorInfo(
    @Json(name = "logo_path")
    val logoPath: String,
    @Json(name = "name")
    val name: String,
    @Json(name = "name_e")
    val nameE: String
)