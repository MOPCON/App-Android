package org.mopcon.session.app.network.model.agenda_detail


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class Img(
    @Json(name = "mobile")
    val mobile: String?,
    @Json(name = "web")
    val web: String?
)