package org.mopcon.session.app.ui.all.agenda.detail

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.core.view.isVisible
import org.mopcon.session.app.databinding.FragmentAgendaDetailBinding
import org.mopcon.session.app.network.model.agenda.RoomData
import org.mopcon.session.app.ui.all.agenda.AgendaViewModel
import org.mopcon.session.app.ui.all.agenda.TagAdapter
import org.mopcon.session.app.ui.base.BaseBindingFragment
import com.google.android.flexbox.*
import org.koin.androidx.viewmodel.ext.android.viewModel
import org.mopcon.session.app.util.*

class AgendaDetailFragment : BaseBindingFragment<FragmentAgendaDetailBinding>() /*OnBackPressedListener*/ {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentAgendaDetailBinding = FragmentAgendaDetailBinding::inflate
    private val tagAdapter by lazy { TagAdapter() }
    private val viewModel: AgendaViewModel by viewModel()

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
                setAvatarVisible((it.speakers ?: listOf()).size)

                cbStar.setOnCheckedChangeListener { _, isChecked ->
                    if (isChecked) viewModel.storeAgenda(it)
                    else viewModel.deleteAgenda(it.sessionId)
                }

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
                    isEnglish = { if (it.summaryE.isNullOrEmpty()) it.summary else it.summaryE },
                    isOtherLanguage = { it.summary }
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

        viewModel.getFavSessionIdList()
    }

    override fun initObserver() {
        viewModel.favSessionIdList.observe(viewLifecycleOwner) {
            binding.cbStar.isChecked = it.contains(args?.sessionId)
        }
    }

}
