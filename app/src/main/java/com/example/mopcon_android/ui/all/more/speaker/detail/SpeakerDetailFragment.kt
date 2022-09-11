package com.example.mopcon_android.ui.all.more.speaker.detail

import android.os.Bundle
import android.view.LayoutInflater
import android.view.ViewGroup
import com.example.mopcon_android.R
import com.example.mopcon_android.databinding.FragmentSpeakerDetailBinding
import com.example.mopcon_android.network.model.more.speaker.SpeakerData
import com.example.mopcon_android.ui.all.agenda.TagAdapter
import com.example.mopcon_android.ui.all.more.sponsor.detail.agenda.MoreAgendaDetailFragment
import com.example.mopcon_android.ui.base.BaseBindingFragment
import com.example.mopcon_android.util.*
import com.google.android.flexbox.*

class SpeakerDetailFragment : BaseBindingFragment<FragmentSpeakerDetailBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentSpeakerDetailBinding
        get() = FragmentSpeakerDetailBinding::inflate

    private val tagAdapter by lazy { TagAdapter() }

    private val args by lazy { arguments?.getParcelable(BUNDLE_SPEAKER_DATA) as SpeakerData? }

    companion object {
        private const val BUNDLE_SPEAKER_DATA = "bundle_speaker_data"
        fun newInstance(speakerData: SpeakerData) = SpeakerDetailFragment().apply {
            val bundle = Bundle().apply {
                putParcelable(BUNDLE_SPEAKER_DATA, speakerData)
            }
            arguments = bundle
        }
    }

    override fun initLayout() {
        binding.apply {
            titleBar.backPressedListener = { activity?.onBackPressed() }

            layoutSpeaker.ivAvatar.setGlideImg("${Constants.MOPCON_API_URL}${args?.img?.mobile}")

            tvSpeakerTitle.text = getDeviceLanguage(
                isEnglish = { args?.nameE ?: args?.name ?: "" },
                isOtherLanguage = { args?.name ?: "" }
            )

            tvJobTitle.text = getDeviceLanguage(
                isEnglish = { args?.jobTitleE ?: args?.jobTitle ?: "" },
                isOtherLanguage = { args?.jobTitle ?: "" }
            )

            mediaBar.apply {

                setOnClickOpenWeb(args?.linkOther, args?.linkFb, null, null, args?.linkGithub, args?.linkTwitter)

                setItemVisibility(
                    args?.linkOther?.isNotEmpty() == true,
                    args?.linkFb?.isNotEmpty() == true,
                    showIg = false,
                    showLinkedIn = false,
                    showGit = args?.linkGithub?.isNotEmpty() == true,
                    showTwitter = args?.linkTwitter?.isNotEmpty() == true,
                )

            }


            /**
             * TODO: do we need ig & linkedin parameter from backend ?
             * thread : https://ksda.slack.com/archives/C036RJ3121K/p1662149277293089?thread_ts=1662148703.368049&cid=C036RJ3121K
             */
/*
            mediaBar.setItemVisibility(
                args?.linkOther?.isNotEmpty() == true,
                args?.linkFb?.isNotEmpty() == true,
                args?.linkIg?.isNotEmpty() == true,
                args?.linkedIn?.isNotEmpty() == true,
                args?.linkGithub?.isNotEmpty() == true,
                args?.linkTwitter?.isNotEmpty() == true,
            )
*/

            tvSpeakerInfo.text = getDeviceLanguage(
                isEnglish = { args?.bioE ?: args?.bio ?: "" },
                isOtherLanguage = { args?.bio ?: "" }
            )

            layoutAgenda.apply {
                val startTime = if (args?.startedAt?.toString().isNullOrEmpty()) "" else "${args?.startedAt?.toTimeFormat(HM_FORMAT)}"
                val endTimeStr = if (args?.endedAt?.toString().isNullOrEmpty()) "" else " - ${args?.endedAt?.toTimeFormat(HM_FORMAT)}"
                tvTime.text = "$startTime$endTimeStr"

                tvContent.text = getDeviceLanguage(
                    isEnglish = { args?.topicE ?: args?.topic ?: "" },
                    isOtherLanguage = { args?.topic ?: "" }
                )

                rvTag.adapter = tagAdapter
                val flexboxLayoutManager = FlexboxLayoutManager(context).apply {
                    flexWrap = FlexWrap.WRAP
                    flexDirection = FlexDirection.ROW
                    alignItems = AlignItems.STRETCH
                    justifyContent = JustifyContent.FLEX_START
                }
                rvTag.layoutManager = flexboxLayoutManager
                tagAdapter.submitList(args?.tags ?: listOf())

                tvSpeaker.text = getDeviceLanguage(
                    isEnglish = { args?.nameE ?: args?.name ?: "" },
                    isOtherLanguage = { args?.name ?: "" }
                )

                tvLocation.text = args?.room

            }

        }

    }

    override fun initAction() {
        binding.layoutAgenda.root.setOnClickListener {
            val sessionId = args?.sessionId ?: return@setOnClickListener
            parentFragmentManager.addFragmentToFragment(R.id.llMore, MoreAgendaDetailFragment.newInstance(sessionId))
        }
    }

    override fun initObserver() {

    }


}