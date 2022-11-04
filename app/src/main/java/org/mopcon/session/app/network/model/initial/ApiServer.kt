package org.mopcon.session.app.network.model.initial


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class ApiServer(
    @Json(name = "game")
    val game: String?,
    @Json(name = "mopcon")
    val mopcon: String?
)