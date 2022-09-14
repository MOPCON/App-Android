package com.example.mopcon_android.network.model.more.sponsor


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable
import com.example.mopcon_android.network.model.agenda.Tag

@JsonClass(generateAdapter = true)
@Parcelize
data class SpeakerInfoData(
    @Json(name = "ended_at")
    val endedAt: Long?,
    @Json(name = "img")
    val img: Img?,
    @Json(name = "name")
    val name: String?,
    @Json(name = "name_e")
    val nameE: String?,
    @Json(name = "room")
    val room: String?,
    @Json(name = "session_id")
    val sessionId: Int,
    @Json(name = "speaker_id")
    val speakerId: Int?,
    @Json(name = "started_at")
    val startedAt: Long?,
    @Json(name = "tags")
    val tags: List<Tag>?,
    @Json(name = "topic_name")
    val topicName: String,
    @Json(name = "topic_name_e")
    val topicNameE: String?
) : Parcelable