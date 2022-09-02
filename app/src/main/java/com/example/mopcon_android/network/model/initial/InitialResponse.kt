package com.example.mopcon_android.network.model.initial


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
data class InitialResponse(
    @Json(name = "data")
    val `data`: InitialData?,
    @Json(name = "message")
    val message: String?,
    @Json(name = "success")
    val success: Boolean?
)