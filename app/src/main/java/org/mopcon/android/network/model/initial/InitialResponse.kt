package org.mopcon.android.network.model.initial


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class InitialResponse(
    @Json(name = "data")
    val initialData: InitialData,
    @Json(name = "message")
    val message: String?,
    @Json(name = "success")
    val success: Boolean?
)