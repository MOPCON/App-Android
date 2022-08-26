package com.example.mopcon_android.ui.all.agenda.detail

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.core.view.isVisible
import androidx.navigation.fragment.navArgs
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

class AgendaDetailFragment : BaseBindingFragment<FragmentAgendaDetailBinding>() /*OnBackPressedListener*/ {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentAgendaDetailBinding = FragmentAgendaDetailBinding::inflate
    private val tagAdapter by lazy { TagAdapter() }
    private val args by lazy { arguments?.getParcelable(BUNDLE_ROOM_DATA) as RoomData? }

    companion object {
        private const val BUNDLE_ROOM_DATA = "bundle_room_data"
        fun newInstance(roomData: RoomData) = AgendaDetailFragment().apply {
            val bundle = Bundle().apply {
                putParcelable(BUNDLE_ROOM_DATA, roomData)
            }
            arguments = bundle
        }
    }

    override fun initLayout() {
        binding.apply {
            args?.let {
                setAvatarVisible(it.speakers.size)

                when (it.speakers.size) {
                    1 -> {
                        layout1Speaker.ivAvatar.setGlideImg(it.speakers.firstOrNull()?.img?.mobile)
                    }
                    2 -> {
                        layout2Speakers.layout1.ivAvatar.setGlideImg(it.speakers.firstOrNull()?.img?.mobile)
                        layout2Speakers.layout2.ivAvatar.setGlideImg(it.speakers.getOrNull(1)?.img?.mobile)
                    }
                    3 -> {
                        layout3Speakers.layout1.ivAvatar.setGlideImg(it.speakers.firstOrNull()?.img?.mobile)
                        layout3Speakers.layout2.ivAvatar.setGlideImg(it.speakers.getOrNull(1)?.img?.mobile)
                        layout3Speakers.layout3.ivAvatar.setGlideImg(it.speakers.getOrNull(2)?.img?.mobile)
                    }
                    4 -> {
                        layout4Speakers.layout1.ivAvatar.setGlideImg(it.speakers.firstOrNull()?.img?.mobile)
                        layout4Speakers.layout2.ivAvatar.setGlideImg(it.speakers.getOrNull(1)?.img?.mobile)
                        layout4Speakers.layout3.ivAvatar.setGlideImg(it.speakers.getOrNull(2)?.img?.mobile)
                        layout4Speakers.layout4.ivAvatar.setGlideImg(it.speakers.getOrNull(3)?.img?.mobile)
                    }
                    else -> {
                        layout1Speaker.ivAvatar.setGlideImg(it.speakers.firstOrNull()?.img?.mobile)
                    }
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

    private fun setAvatarVisible(numberOfSpeaker: Int) {
        val listOfSpeaker: List<ConstraintLayout> = listOf(
            binding.layout1Speaker.root,
            binding.layout2Speakers.root,
            binding.layout3Speakers.root,
            binding.layout4Speakers.root
        )

        listOfSpeaker.forEachIndexed { index, item ->
            item.isVisible = (index + 1 == numberOfSpeaker)
        }
    }

    override fun initAction() {
        binding.ivBack.setOnClickListener {
            activity?.onBackPressed()
            Log.e(">>>", "ivBack")
        }
    }

    override fun initObserver() {
    }

//    override fun onBackPressed() {
//        activity?.supportFragmentManager?.popBackStack(, FragmentManager.POP_BACK_STACK_INCLUSIVE)
//    }

}
