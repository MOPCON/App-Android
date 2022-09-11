package com.example.mopcon_android.ui.all.more.sponsor.detail

import android.os.Bundle
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.mopcon_android.R
import com.example.mopcon_android.databinding.*
import com.example.mopcon_android.network.model.more.sponsor.SponsorDetailData
import com.example.mopcon_android.ui.all.more.sponsor.detail.agenda.MoreAgendaDetailFragment
import com.example.mopcon_android.ui.base.BaseBindingFragment
import com.example.mopcon_android.util.addFragmentToFragment

class SponsorDetailFragment : BaseBindingFragment<FragmentSponsorDetailBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentSponsorDetailBinding
        get() = FragmentSponsorDetailBinding::inflate

    private val sponsorDetailAdapter by lazy {
        SponsorDetailAdapter(SponsorDetailItemClickListener {
            if (it.sessionId == null) return@SponsorDetailItemClickListener
            parentFragmentManager.addFragmentToFragment(R.id.llMore, MoreAgendaDetailFragment.newInstance(it.sessionId))
        })
    }

    private val args by lazy { arguments?.getParcelable(BUNDLE_SPONSOR_DATA) as SponsorDetailData? }

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
        sponsorDetailAdapter.addFooterAndSubmitList(args)
    }

    override fun initAction() {

    }

    override fun initObserver() {

    }


}