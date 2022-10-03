package org.mopcon.session.app.ui.all.more.sponsor.detail.agenda

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.core.view.isVisible
import org.mopcon.session.app.databinding.FragmentAgendaDetailBinding
import org.mopcon.session.app.network.model.agenda.RoomData
import org.mopcon.session.app.network.model.agenda.Speaker
import org.mopcon.session.app.ui.all.agenda.TagAdapter
import org.mopcon.session.app.ui.base.BaseBindingFragment
import com.google.android.flexbox.*
import org.koin.androidx.viewmodel.ext.android.viewModel
import org.mopcon.session.app.util.*

class MoreAgendaDetailFragment : BaseBindingFragment<FragmentAgendaDetailBinding>() {
    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentAgendaDetailBinding = FragmentAgendaDetailBinding::inflate
    private val tagAdapter by lazy { TagAdapter() }
    private val argsSessionId by lazy { arguments?.getInt(BUNDLE_SESSION_ID) }

    private val viewModel: MoreAgendaDetailViewModel by viewModel()

    companion object {
        private const val BUNDLE_SESSION_ID = "bundle_session_id"
        fun newInstance(sessionId: Int) = MoreAgendaDetailFragment().apply {
            val bundle = Bundle().apply {
                putInt(BUNDLE_SESSION_ID, sessionId)
            }
            Log.e(">>>", "sessionId = $sessionId")
            arguments = bundle
        }
    }
/*
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        setUpOnBackPressed()
        return super.onCreateView(inflater, container, savedInstanceState)
    }

    private fun setUpOnBackPressed() {
        requireActivity().onBackPressedDispatcher.addCallback(object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (isEnabled) {
                    isEnabled = false
                    Log.e(">>>", "onBackPressed 2")
                    requireActivity().onBackPressed()
                }
            }
        })
    }
*/

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
            if (isChecked) {
                val data = viewModel.agendaDetail.value ?: return@setOnCheckedChangeListener // return null since api return failed =_=
                viewModel.storeAgenda(data)
            } else {
                viewModel.deleteAgenda(argsSessionId)
            }
        }

        viewModel.getFavSessionIdList()

        if (isSession()) viewModel.getAgendaDetail(argsSessionId)
        else viewModel.getExchangeDetail(argsSessionId)
    }

    private fun isSession(): Boolean = argsSessionId?.rem(1000)?:0 < 100

    override fun initObserver() {
        viewModel.favSessionIdList.observe(viewLifecycleOwner) {
            binding.cbStar.isChecked = it.contains(argsSessionId)
        }

        viewModel.agendaDetail.observe(viewLifecycleOwner) {
            setDataToLayout(it, it.speakers)
        }

        viewModel.exchangeDetail.observe(viewLifecycleOwner) {
            setDataToLayout(it, it.speakers)
        }

        viewModel.isLoading.observe(viewLifecycleOwner) {
            if (it) loading() else hideLoading()
        }
    }

    private fun setDataToLayout(it: RoomData, speakers: List<Speaker>?) {
        binding.apply {
            setAvatarVisible((it.speakers ?: listOf()).size)

            when (it.speakers?.size) {
                1 -> {
                    layout1Speaker.ivAvatar.setGlideImg(speakers?.firstOrNull()?.img?.mobile?.addUrlPrefix())
                }
                2 -> {
                    layout2Speakers.layout1.ivAvatar.setGlideImg(speakers?.firstOrNull()?.img?.mobile?.addUrlPrefix())
                    layout2Speakers.layout2.ivAvatar.setGlideImg(speakers?.getOrNull(1)?.img?.mobile?.addUrlPrefix())
                }
                3 -> {
                    layout3Speakers.layout1.ivAvatar.setGlideImg(speakers?.firstOrNull()?.img?.mobile?.addUrlPrefix())
                    layout3Speakers.layout2.ivAvatar.setGlideImg(speakers?.getOrNull(1)?.img?.mobile?.addUrlPrefix())
                    layout3Speakers.layout3.ivAvatar.setGlideImg(speakers?.getOrNull(2)?.img?.mobile?.addUrlPrefix())
                }
                4 -> {
                    layout4Speakers.layout1.ivAvatar.setGlideImg(speakers?.firstOrNull()?.img?.mobile?.addUrlPrefix())
                    layout4Speakers.layout2.ivAvatar.setGlideImg(speakers?.getOrNull(1)?.img?.mobile?.addUrlPrefix())
                    layout4Speakers.layout3.ivAvatar.setGlideImg(speakers?.getOrNull(2)?.img?.mobile?.addUrlPrefix())
                    layout4Speakers.layout4.ivAvatar.setGlideImg(speakers?.getOrNull(3)?.img?.mobile?.addUrlPrefix())
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

}
