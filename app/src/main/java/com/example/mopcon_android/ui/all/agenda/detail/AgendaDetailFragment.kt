package com.example.mopcon_android.ui.all.agenda.detail

import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.navArgs
import com.bumptech.glide.Glide
import com.example.mopcon_android.R
import com.example.mopcon_android.databinding.FragmentAgendaDetailBinding
import com.example.mopcon_android.network.model.agenda.RoomData
import com.example.mopcon_android.ui.all.agenda.TagAdapter
import com.example.mopcon_android.ui.base.BaseBindingFragment
import com.example.mopcon_android.util.HM_FORMAT
import com.example.mopcon_android.util.getDeviceLanguage
import com.example.mopcon_android.util.setGlideImg
import com.example.mopcon_android.util.toTimeFormat
import com.google.android.flexbox.*
import org.koin.androidx.viewmodel.ext.android.viewModel

class AgendaDetailFragment : BaseBindingFragment<FragmentAgendaDetailBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentAgendaDetailBinding = FragmentAgendaDetailBinding::inflate

//    private val viewModel: AgendaDetailViewModel by viewModel()

    private val args: AgendaDetailFragmentArgs by navArgs()

//    private val testUrl = "https://i1.kknews.cc/DGWUD0aD7sV2MS8YBnprAEEcmSjyXtHejnqwN0A/0.jpg"

    private val tagAdapter by lazy { TagAdapter() }

    override fun initLayout() {

        binding.apply {
            args.roomData.let {
                when (it.speakers.size) {
                    1 -> {
                        ivAvatar.setGlideImg(it.speakers.firstOrNull()?.img?.mobile)
                    }
                    2 -> {}
                    3 -> {}
                    4 -> {}
                    else -> {}
                }

                tvSpeaker.text = getDeviceLanguage(
                    isEnglish = { it.speakers.joinToString("｜") { speaker -> if (speaker.nameE.isNullOrEmpty()) speaker.name else speaker.nameE } },
                    isOtherLanguage = { it.speakers.joinToString("｜") { speaker -> speaker.name } }
                )

                tvJobTitle.text = getDeviceLanguage(
                    isEnglish = { it.speakers.joinToString("｜") { speaker -> if (speaker.jobTitleE.isNullOrEmpty()) speaker.jobTitle else speaker.jobTitleE } },
                    isOtherLanguage = { it.speakers.joinToString("｜") { speaker -> speaker.jobTitle } }
                )

                val startTime = if (it.startedAt?.toString().isNullOrEmpty()) "" else "${it.startedAt?.toTimeFormat(HM_FORMAT)}"
                val endTimeStr = if (it.endedAt?.toString().isNullOrEmpty()) "" else " - ${it.endedAt?.toTimeFormat(HM_FORMAT)}"
                tvTime.text = "$startTime$endTimeStr"
                tvPlace.text = it.room
                tvTitle.text = getDeviceLanguage(
                    isEnglish = { if (it.topicE.isNullOrEmpty()) it.topic else it.topicE },
                    isOtherLanguage = { it.topic }
                )
                tvContent.text = getDeviceLanguage(
                    isEnglish = { if (it.summaryE.isNullOrEmpty()) it.summary else it.summaryE },
                    isOtherLanguage = { it.summary }
                )

                if (it.sponsorInfo?.logoPath.isNullOrEmpty()) llSponsor.visibility = View.GONE
                else ivSponsor.setGlideImg(it.sponsorInfo?.logoPath)

                rvTag.apply {
                    adapter = tagAdapter
                    val flexboxLayoutManager = FlexboxLayoutManager(this.context).apply {
                        flexWrap = FlexWrap.WRAP
                        flexDirection = FlexDirection.ROW
                        alignItems = AlignItems.STRETCH
                        justifyContent = JustifyContent.FLEX_START
                    }
                    layoutManager = flexboxLayoutManager

                }

                tagAdapter.submitList(it.tags)
            }
        }

    }

    override fun initAction() {
    }

    override fun initObserver() {
    }


}