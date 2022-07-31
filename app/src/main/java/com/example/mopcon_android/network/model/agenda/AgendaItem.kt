package com.example.mopcon_android.network.model.agenda


import com.squareup.moshi.Json

data class AgendaItem(
    @Json(name = "id")
    val id: Int,
    //TODO: input api response list items
)