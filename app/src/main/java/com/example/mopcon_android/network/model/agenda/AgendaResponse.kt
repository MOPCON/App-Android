package com.example.mopcon_android.network.model.agenda


import com.squareup.moshi.Json

data class AgendaResponse(
    @Json(name = "data")
    val data: List<AgendaData>,
    @Json(name = "message")
    val message: String,
    @Json(name = "success")
    val success: Boolean
)