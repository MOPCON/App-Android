package com.example.mopcon_android.ui.all.more.speaker.detail

import android.view.LayoutInflater
import android.view.ViewGroup
import com.example.mopcon_android.databinding.FragmentMoreBinding
import com.example.mopcon_android.databinding.FragmentSpeakerBinding
import com.example.mopcon_android.databinding.FragmentSpeakerDetailBinding
import com.example.mopcon_android.ui.all.more.speaker.SpeakerFragment
import com.example.mopcon_android.ui.base.BaseBindingFragment

class SpeakerDetailFragment : BaseBindingFragment<FragmentSpeakerDetailBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentSpeakerDetailBinding
        get() = FragmentSpeakerDetailBinding::inflate

    companion object {
        fun newInstance () = SpeakerDetailFragment().apply {

        }
    }

    override fun initLayout() {
        binding.apply {
            titleBar.backPressedListener = { activity?.onBackPressed() }


        }
    }

    override fun initAction() {

    }

    override fun initObserver() {

    }


}