package org.mopcon.session.app.network.model.agenda


import android.os.Parcelable
import com.squareup.moshi.Json
import kotlinx.parcelize.Parcelize

@Parcelize
data class Speaker(
    @Json(name = "company")
    val company: String? = null,
    @Json(name = "company_e")
    val companyE: String? = null,
    @Json(name = "img")
    val img: Img? = null,
    @Json(name = "job_title")
    val jobTitle: String? = null,
    @Json(name = "job_title_e")
    val jobTitleE: String? = null,
    @Json(name = "name")
    val name: String? = null,
    @Json(name = "name_e")
    val nameE: String? = null,
    @Json(name = "speaker_id")
    val speakerId: Int? = null
) : Parcelable