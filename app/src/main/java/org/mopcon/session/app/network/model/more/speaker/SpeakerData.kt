package org.mopcon.session.app.network.model.more.speaker


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable
import org.mopcon.session.app.network.model.agenda.Tag

@JsonClass(generateAdapter = true)
@Parcelize
data class SpeakerData(
    @Json(name = "bio")
    val bio: String?,
    @Json(name = "bio_e")
    val bioE: String?,
    @Json(name = "community_partner")
    val communityPartner: String?,
    @Json(name = "company")
    val company: String?,
    @Json(name = "company_e")
    val companyE: String?,
    @Json(name = "ended_at")
    val endedAt: Long?,
    @Json(name = "expected_gain")
    val expectedGain: String?,
    @Json(name = "expected_gain_e")
    val expectedGainE: String?,
    @Json(name = "floor")
    val floor: String?,
    @Json(name = "img")
    val img: Img?,
    @Json(name = "is_keynote")
    val isKeynote: Boolean?,
    @Json(name = "is_online")
    val isOnline: Boolean?,
    @Json(name = "job_title")
    val jobTitle: String = "",
    @Json(name = "job_title_e")
    val jobTitleE: String?,
    @Json(name = "level")
    val level: String?,
    @Json(name = "link_fb")
    val linkFb: String?,
    @Json(name = "link_github")
    val linkGithub: String?,
    @Json(name = "link_other")
    val linkOther: String?,
    @Json(name = "link_slide")
    val linkSlide: String?,
    @Json(name = "link_twitter")
    val linkTwitter: String?,
    @Json(name = "name")
    val name: String = "",
    @Json(name = "name_e")
    val nameE: String?,
    @Json(name = "prior_knowledge")
    val priorKnowledge: String?,
    @Json(name = "prior_knowledge_e")
    val priorKnowledgeE: String?,
    @Json(name = "recordable")
    val recordable: Boolean?,
    @Json(name = "room")
    val room: String?,
    @Json(name = "session_id")
    val sessionId: Int,
    @Json(name = "speaker_id")
    val speakerId: Int?,
    @Json(name = "sponsor_id")
    val sponsorId: Int?,
    @Json(name = "started_at")
    val startedAt: Long?,
    @Json(name = "summary")
    val summary: String?,
    @Json(name = "summary_e")
    val summaryE: String?,
    @Json(name = "tags")
    val tags: List<Tag>?= listOf(),
    @Json(name = "target")
    val target: String?,
    @Json(name = "target_e")
    val targetE: String?,
    @Json(name = "topic")
    val topic: String?,
    @Json(name = "topic_e")
    val topicE: String?
) : Parcelable