package com.example.mopcon_android.ui.all.more.sponsor

import android.view.LayoutInflater
import android.view.ViewGroup
import com.example.mopcon_android.databinding.FragmentMoreBinding
import com.example.mopcon_android.databinding.FragmentSponsorBinding
import com.example.mopcon_android.ui.all.more.MoreFragment
import com.example.mopcon_android.ui.base.BaseBindingFragment

class SponsorFragment : BaseBindingFragment<FragmentSponsorBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentSponsorBinding
        get() = FragmentSponsorBinding::inflate

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