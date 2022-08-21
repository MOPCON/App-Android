package com.example.mopcon_android.network.model.agenda


import com.squareup.moshi.Json

data class Speaker(
    @Json(name = "company")
    val company: String,
    @Json(name = "company_e")
    val companyE: String ?= null,
    @Json(name = "img")
    val img: Img,
    @Json(name = "job_title")
    val jobTitle: String,
    @Json(name = "job_title_e")
    val jobTitleE: String ?= null,
    @Json(name = "name")
    val name: String,
    @Json(name = "name_e")
    val nameE: String ?= null,
    @Json(name = "speaker_id")
    val speakerId: Int
)