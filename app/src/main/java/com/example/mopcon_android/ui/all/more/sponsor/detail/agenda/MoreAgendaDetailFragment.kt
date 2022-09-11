package com.example.mopcon_android.ui.all.more.sponsor.detail.agenda

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.core.view.isVisible
import com.example.mopcon_android.databinding.FragmentAgendaDetailBinding
import com.example.mopcon_android.ui.all.agenda.TagAdapter
import com.example.mopcon_android.ui.base.BaseBindingFragment
import com.example.mopcon_android.util.*
import com.google.android.flexbox.*
import org.koin.androidx.viewmodel.ext.android.viewModel

class MoreAgendaDetailFragment : BaseBindingFragment<FragmentAgendaDetailBinding>() {
    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentAgendaDetailBinding = FragmentAgendaDetailBinding::inflate
    private val tagAdapter by lazy { TagAdapter() }
    private val argsIsConf by lazy { arguments?.getBoolean(BUNDLE_IS_CONF) }
    private val argsSessionId by lazy { arguments?.getInt(BUNDLE_SESSION_ID) }

    private val viewModel: MoreAgendaDetailViewModel by viewModel()

    companion object {
        private const val BUNDLE_IS_CONF = "bundle_is_conf"
        private const val BUNDLE_SESSION_ID = "bundle_session_id"
        fun newInstance(isConf: Boolean, sessionId: Int) = MoreAgendaDetailFragment().apply {
            val bundle = Bundle().apply {
                putBoolean(BUNDLE_IS_CONF, isConf)
                putInt(BUNDLE_SESSION_ID, sessionId)
            }
            arguments = bundle
        }
    }

    override fun initLayout() {
        binding.apply {}
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
        }

        binding.cbStar.setOnCheckedChangeListener { _, isChecked ->
            if (isChecked) viewModel.storeAgenda(argsIsConf == true) else viewModel.deleteAgenda(argsSessionId)
        }

        viewModel.getFavSessionIdList()
        viewModel.getAgendaDetail(argsSessionId)
    }

    override fun initObserver() {
        viewModel.favSessionIdList.observe(viewLifecycleOwner) {
            binding.cbStar.isChecked = it.contains(argsSessionId)
        }

        viewModel.agendaDetail.observe(viewLifecycleOwner) {
            binding.apply {
                setAvatarVisible((it.speakers ?: listOf()).size)

                when (it.speakers?.size) {
                    1 -> {
                        layout1Speaker.ivAvatar.setGlideImg(it.speakers.firstOrNull()?.img?.mobile?.addUrlPrefix())
                    }
                    2 -> {
                        layout2Speakers.layout1.ivAvatar.setGlideImg(it.speakers.firstOrNull()?.img?.mobile?.addUrlPrefix())
                        layout2Speakers.layout2.ivAvatar.setGlideImg(it.speakers.getOrNull(1)?.img?.mobile?.addUrlPrefix())
                    }
                    3 -> {
                        layout3Speakers.layout1.ivAvatar.setGlideImg(it.speakers.firstOrNull()?.img?.mobile?.addUrlPrefix())
                        layout3Speakers.layout2.ivAvatar.setGlideImg(it.speakers.getOrNull(1)?.img?.mobile?.addUrlPrefix())
                        layout3Speakers.layout3.ivAvatar.setGlideImg(it.speakers.getOrNull(2)?.img?.mobile?.addUrlPrefix())
                    }
                    4 -> {
                        layout4Speakers.layout1.ivAvatar.setGlideImg(it.speakers.firstOrNull()?.img?.mobile?.addUrlPrefix())
                        layout4Speakers.layout2.ivAvatar.setGlideImg(it.speakers.getOrNull(1)?.img?.mobile?.addUrlPrefix())
                        layout4Speakers.layout3.ivAvatar.setGlideImg(it.speakers.getOrNull(2)?.img?.mobile?.addUrlPrefix())
                        layout4Speakers.layout4.ivAvatar.setGlideImg(it.speakers.getOrNull(3)?.img?.mobile?.addUrlPrefix())
                    }
                    else -> {
                        layout1Speaker.ivAvatar.setGlideImg(it.speakers?.firstOrNull()?.img?.mobile?.addUrlPrefix())
                    }
                }

                tvSpeaker.text = getDeviceLanguage(
                    isEnglish = { (it.speakers ?: listOf()).joinToString("｜") { speaker -> if (speaker.nameE.isNullOrEmpty()) speaker.name ?: "" else speaker.nameE } },
                    isOtherLanguage = { (it.speakers ?: listOf()).joinToString("｜") { speaker -> speaker.name ?: "" } }
                )

                tvJobTitle.text = getDeviceLanguage(
                    isEnglish = { (it.speakers ?: listOf()).joinToString("｜") { speaker -> if (speaker.jobTitleE.isNullOrEmpty()) speaker.jobTitle ?: "" else speaker.jobTitleE } },
                    isOtherLanguage = { (it.speakers ?: listOf()).joinToString("｜") { speaker -> speaker.jobTitle ?: "" } }
                )

                val startTime = if (it.startedAt?.toString().isNullOrEmpty()) "" else "${it.startedAt?.toTimeFormat(HM_FORMAT)}"
                val endTimeStr = if (it.endedAt?.toString().isNullOrEmpty()) "" else " - ${it.endedAt?.toTimeFormat(HM_FORMAT)}"
                tvTime.text = "$startTime$endTimeStr"
                tvPlace.text = it.room
                tvTitle.text = getDeviceLanguage(
                    isEnglish = { if (it.topicE.isNullOrEmpty()) it.topic ?: "" else it.topicE },
                    isOtherLanguage = { it.topic ?: "" }
                )
                tvContent.text = getDeviceLanguage(
                    isEnglish = { if (it.summaryE.isNullOrEmpty()) it.summary ?: "" else it.summaryE },
                    isOtherLanguage = { it.summary ?: "" }
                )

                if (it.sponsorInfo?.logoPath?.mobile.isNullOrEmpty()) llSponsor.visibility = View.GONE
                else ivSponsor.setGlideImg(it.sponsorInfo?.logoPath?.mobile)

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

        viewModel.isLoading.observe(viewLifecycleOwner) {
            if (it) loading() else hideLoading()
        }
    }

}
