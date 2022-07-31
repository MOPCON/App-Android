package com.example.mopcon_android.network.model.agenda


import com.squareup.moshi.Json

data class AgendaResponse(
    @Json(name = "hits")
    val agendaItems: List<AgendaItem>,
    @Json(name = "total")
    val total: Int,
    //TODO: input api response items
)