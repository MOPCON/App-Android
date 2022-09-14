package com.example.mopcon_android.ui.all.more.sponsor.detail

import android.os.Bundle
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.mopcon_android.R
import com.example.mopcon_android.databinding.*
import com.example.mopcon_android.db.AgendaFavData
import com.example.mopcon_android.db.DataConverter
import com.example.mopcon_android.network.model.more.sponsor.SponsorDetailData
import com.example.mopcon_android.ui.all.more.sponsor.SponsorViewModel
import com.example.mopcon_android.ui.all.more.sponsor.detail.agenda.MoreAgendaDetailFragment
import com.example.mopcon_android.ui.base.BaseBindingFragment
import com.example.mopcon_android.util.HM_FORMAT
import com.example.mopcon_android.util.addFragmentToFragment
import com.example.mopcon_android.util.toTimeFormat
import org.koin.androidx.viewmodel.ext.android.viewModel

class SponsorDetailFragment : BaseBindingFragment<FragmentSponsorDetailBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentSponsorDetailBinding
        get() = FragmentSponsorDetailBinding::inflate

    private val viewModel: SponsorViewModel by viewModel()

    private val args by lazy { arguments?.getParcelable(BUNDLE_SPONSOR_DATA) as SponsorDetailData? }

    private val sponsorDetailAdapter by lazy {
        SponsorDetailAdapter(SponsorDetailItemClickListener {
            if (it.sessionId == null) return@SponsorDetailItemClickListener
            parentFragmentManager.addFragmentToFragment(R.id.llMore, MoreAgendaDetailFragment.newInstance(it.sessionId))
        }, FavClickListener { isChecked, data ->
            if (isChecked) {
                val startTime = if (data.startedAt?.toString().isNullOrEmpty()) "" else "${data.startedAt?.toTimeFormat(HM_FORMAT)}"
                val endTimeStr = if (data.endedAt?.toString().isNullOrEmpty()) "" else " - ${data.endedAt?.toTimeFormat(HM_FORMAT)}"
                viewModel.storeAgenda(
                    AgendaFavData(
                        sessionId = data.sessionId,
                        startAt = data.startedAt ?: 0,
                        time = "$startTime$endTimeStr",
                        topic = data.topicName,
                        topicE = data.topicNameE ?: data.topicName,
                        names = data.name ?: "",
                        namesE = data.nameE ?: data.name ?: "",
                        location = data.room ?: "",
                        tags = DataConverter.fromTagList(data.tags)
                    )
                )
            } else {
                viewModel.deleteAgenda(data.sessionId)
            }
        })
    }
    companion object {
        private const val BUNDLE_SPONSOR_DATA = "bundle_sponsor_data"
        fun newInstance(sponsorDetailData: SponsorDetailData) = SponsorDetailFragment().apply {
            val bundle = Bundle().apply {
                putParcelable(BUNDLE_SPONSOR_DATA, sponsorDetailData)
            }
            arguments = bundle
        }
    }

    override fun initLayout() {
        binding.rvSponsorDetail.apply {
            adapter = sponsorDetailAdapter
            layoutManager = LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
        }
    }

    override fun initAction() {
        viewModel.getFavSessionIdList()
    }

    override fun initObserver() {
        viewModel.favSessionIdList.observe(viewLifecycleOwner) {
            sponsorDetailAdapter.addFooterAndSubmitList(it, args)
        }
    }


}