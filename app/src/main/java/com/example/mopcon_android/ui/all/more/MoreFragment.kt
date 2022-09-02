package com.example.mopcon_android.ui.all.more

import android.view.LayoutInflater
import android.view.ViewGroup
import com.example.mopcon_android.R
import com.example.mopcon_android.databinding.FragmentMoreBinding
import com.example.mopcon_android.ui.all.more.host_community.HostCommunityFragment
import com.example.mopcon_android.ui.all.more.speaker.SpeakerFragment
import com.example.mopcon_android.ui.all.more.sponsor.SponsorFragment
import com.example.mopcon_android.ui.base.BaseBindingFragment
import com.example.mopcon_android.util.addFragmentToFragment

class MoreFragment : BaseBindingFragment<FragmentMoreBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentMoreBinding
        get() = FragmentMoreBinding::inflate

    override fun initLayout() {

    }

    override fun initAction() {

        binding.llSpeaker.setOnClickListener {
            parentFragmentManager.addFragmentToFragment(R.id.llMore, SpeakerFragment.newInstance())
        }

        binding.llSponsor.setOnClickListener {
            parentFragmentManager.addFragmentToFragment(R.id.llMore, SponsorFragment.newInstance())
        }

        binding.llHostCommunity.setOnClickListener {
            parentFragmentManager.addFragmentToFragment(R.id.llMore, HostCommunityFragment.newInstance())
        }

    }

    override fun initObserver() {

    }


}