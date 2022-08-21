package com.example.mopcon_android.network.model.agenda


import com.squareup.moshi.Json

data class AgendaData(
    @Json(name = "date")
    val date: Int,
    @Json(name = "period")
    val period: List<Period>
)