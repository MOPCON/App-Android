package org.mopcon.session.app.ui.all.more.speaker.detail

import android.os.Bundle
import android.view.LayoutInflater
import android.view.ViewGroup
import org.mopcon.session.app.databinding.FragmentSpeakerDetailBinding
import org.mopcon.session.app.db.AgendaFavData
import org.mopcon.session.app.db.DataConverter
import org.mopcon.session.app.network.model.more.speaker.SpeakerData
import org.mopcon.session.app.ui.all.agenda.TagAdapter
import org.mopcon.session.app.ui.all.more.speaker.SpeakerViewModel
import org.mopcon.session.app.ui.all.more.sponsor.detail.agenda.MoreAgendaDetailFragment
import org.mopcon.session.app.ui.base.BaseBindingFragment
import com.google.android.flexbox.*
import org.koin.androidx.viewmodel.ext.android.viewModel
import org.mopcon.session.app.R
import org.mopcon.session.app.util.*
import org.mopcon.session.app.util.Constants.MOPCON_API_URL

class SpeakerDetailFragment : BaseBindingFragment<FragmentSpeakerDetailBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentSpeakerDetailBinding
        get() = FragmentSpeakerDetailBinding::inflate

    private val tagAdapter by lazy { TagAdapter() }

    private val viewModel: SpeakerViewModel by viewModel()

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

            layoutSpeaker.ivAvatar.setGlideImg("${MOPCON_API_URL}${args?.img?.mobile}")

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
                val startTime = if (args?.startedAt?.toString().isNullOrEmpty()) "" else "${args?.startedAt?.toTimeFormat(MD_FORMAT)} ${args?.startedAt?.toTimeFormat(HM_FORMAT)}"
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

        binding.layoutAgenda.cbStar.setOnCheckedChangeListener { _, isChecked ->
            args?.let { data ->
                val startTime = if (data.startedAt?.toString().isNullOrEmpty()) "" else "${data.startedAt?.toTimeFormat(HM_FORMAT)}"
                val endTimeStr = if (data.endedAt?.toString().isNullOrEmpty()) "" else " - ${data.endedAt?.toTimeFormat(HM_FORMAT)}"

                if (isChecked) viewModel.storeAgenda(
                    AgendaFavData(
                        sessionId = data.sessionId,
                        startAt = data.startedAt ?: 0,
                        time = "$startTime$endTimeStr",
                        topic = data.topic ?: "",
                        topicE = data.topicE ?: "",
                        names = if (data.nameE.isNullOrEmpty()) data.name else data.nameE,
                        namesE = data.nameE ?: data.name,
                        location = data.room ?: "",
                        tags = DataConverter.fromTagList(data.tags)
                    )
                ) else {
                    viewModel.deleteAgenda(args?.sessionId)
                }
            }
        }

        viewModel.getFavSessionIdList()
    }

    override fun initObserver() {
        viewModel.favSessionIdList.observe(viewLifecycleOwner) {
            binding.layoutAgenda.cbStar.isChecked = it.contains(args?.sessionId)
        }
    }


}