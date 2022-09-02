package com.example.mopcon_android.network.model.initial


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
data class InitialData(
    @Json(name = "api_server")
    val apiServer: ApiServer?,
    @Json(name = "enable_game")
    val enableGame: Boolean?
)