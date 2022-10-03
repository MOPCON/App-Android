package org.mopcon.session.app.network.model.agenda_detail


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class Speaker(
    @Json(name = "company")
    val company: String?,
    @Json(name = "company_e")
    val companyE: String?,
    @Json(name = "img")
    val img: Img?,
    @Json(name = "job_title")
    val jobTitle: String?,
    @Json(name = "job_title_e")
    val jobTitleE: String?,
    @Json(name = "name")
    val name: String?,
    @Json(name = "name_e")
    val nameE: String?,
    @Json(name = "speaker_id")
    val speakerId: Int?
)