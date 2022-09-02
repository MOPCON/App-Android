package com.example.mopcon_android.ui.all.more.host_community

import android.view.LayoutInflater
import android.view.ViewGroup
import com.example.mopcon_android.databinding.FragmentHostCommunityBinding
import com.example.mopcon_android.databinding.FragmentMoreBinding
import com.example.mopcon_android.ui.all.more.sponsor.SponsorFragment
import com.example.mopcon_android.ui.base.BaseBindingFragment

class HostCommunityFragment : BaseBindingFragment<FragmentHostCommunityBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentHostCommunityBinding
        get() = FragmentHostCommunityBinding::inflate

    companion object {
        fun newInstance () = SponsorFragment().apply {

        }
    }

    override fun initLayout() {

    }

    override fun initAction() {

    }

    override fun initObserver() {

    }


}