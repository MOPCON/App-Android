package org.mopcon.session.app.ui.all.more

import android.view.LayoutInflater
import android.view.ViewGroup
import org.mopcon.session.app.R
import org.mopcon.session.app.databinding.FragmentMoreBinding
import org.mopcon.session.app.ui.all.more.host_community.HostCommunityFragment
import org.mopcon.session.app.ui.all.more.speaker.SpeakerFragment
import org.mopcon.session.app.ui.all.more.sponsor.SponsorFragment
import org.mopcon.session.app.ui.base.BaseBindingFragment
import org.mopcon.session.app.util.addFragmentToFragment

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