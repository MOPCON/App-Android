package com.example.mopcon_android.network.model.initial


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
data class ApiServer(
    @Json(name = "game")
    val game: String?,
    @Json(name = "mopcon")
    val mopcon: String?
)