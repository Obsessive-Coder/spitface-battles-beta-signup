const restrictedUsernames = [
    "ObsessiveCoder",
    "obsessivecoder",
    "SpitfaceBattles",
    "Spitface Battles",
    "Obsessive_Coder",
    "obsessive_coder",
    "Obsessive.Coder",
    "obsessive.coder",
    "Obsessive-Coder",
    "obsessive-coder",
    "Obsessive'Coder",
    "obsessive'coder",
    "ObsessiveCoder1",
    "ObsessiveCoder123",
    "0bsessiveCoder",
    "Obsess1veCoder",
    "Obsessive Coder",
    "TheObsessiveCoder",
    "iAmObsessiveCoder",
    "ObsessiveCoderOfficial",
    "ObsessiveCoder_",
    "Obsessive.Coder.",
    "Obsessive--Coder",
    "Obsessive..Coder",
    "Obsessive__Coder",
    "Obsessive.Coder-",
    "ObsessiveCoderX",
    "RealObsessiveCoder",
    "Obsessive_Coder99",
    "Obsessive-Coder-007",
    "ObsessiveCoderElite",
    "XxObsessiveCoderxX",
    "Obsessive_Coder-Pro",
    "Obsessive.Coder.VIP",
    "Obsessive-Coder_Official",
    "Obsessive'Coder'Master",
    "ObsessiveKoder",
    "0bsessiveKoder",
    "Obsessive_C0der",
    "Obsessive.C0der",
    "Obsessive-C0der",
    "Obsessive_Cøder",
    "Obsess1ve_Koder",
    "Obsessive.K0der",
    "Obsessive-Cøder",
    "ObsessiveCoderXx",
    "xXObsessiveCoderXx",
    "ObsessiveCoderTheGreat",
    "TheRealObsessiveCoder",
    "ObsessiveCoderOG",
    "ObsessiveCoder2000",
    "ObsessiveCoder420",
    "ObsessiveCoder69",
    "Obsessive_CoderX",
    "Obsessive_Coder-Prime",
    "Obsessive_Coder_One",
    "Obsessive_Coder_Only",
    "Obsessive_Coder_True",
    "Obsessive_Coder-Dev",
    "Obsessive_Coder-Master",
    "ObsessiveCoderGod",
    "ObsessiveCoderKing",
    "ObsessiveCoderLegend",
    "ObsessiveCoderUltimate",
    "ObsessiveCoderV2",
    "ObsessiveCoderProMax",
    "ObsessiveCoder_Unleashed",
    "ObsessiveCoder_Bot",
    "ObsessiveCoder_AI",
    "Sp1tface",
    "Spitf4ce",
    "Sp1tf4ce",
    "Sp!tface",
    "Spit_f@ce",
    "Spit.face",
    "Spit-face",
    "SpitfaceX",
    "Spitface_Official",
    "Spitface_TheReal",
    "TheRealSpitface",
    "SpitfaceOG",
    "Spitface420",
    "Spitface69",
    "Spitface2000",
    "Spitface_Only",
    "Spitface_True",
    "Spitface_Dev",
    "Spitface_Master",
    "Spitface_Pro",
    "Spitface_Unleashed",
    "SpitfaceGod",
    "SpitfaceKing",
    "SpitfaceLegend",
    "SpitfaceUltimate",
    "SpitfaceV2",
    "SpitfaceProMax",
    "Spitface_AI",
    "Spitface_Bot",
    "SpitfaceBattles",
    "Sp1tfaceBattles",
    "Spitf4ceBattles",
    "Sp1tf4ceBattles",
    "Sp!tfaceBattles",
    "Spit_f@ceBattles",
    "Spitface_Battles",
    "Spitface.Battles",
    "Spitface-Battles",
    "SpitfaceBattlesX",
    "SpitfaceBattles_Official",
    "SpitfaceBattles_TheReal",
    "TheRealSpitfaceBattles",
    "SpitfaceBattlesOG",
    "SpitfaceBattles420",
    "SpitfaceBattles69",
    "SpitfaceBattles2000",
    "SpitfaceBattles_Only",
    "SpitfaceBattles_True",
    "SpitfaceBattles_Dev",
    "SpitfaceBattles_Master",
    "SpitfaceBattles_Pro",
    "SpitfaceBattles_Unleashed",
    "SpitfaceBattlesGod",
    "SpitfaceBattlesKing",
    "SpitfaceBattlesLegend",
    "SpitfaceBattlesUltimate",
    "SpitfaceBattlesV2",
    "SpitfaceBattlesProMax",
    "SpitfaceBattles_AI",
    "SpitfaceBattles_Bot",
    "Spitfac3",
    "Spitf@ce",
    "Sp!t.f@ce",
    "5pitface",
    "Spitfaçé",
    "Sp1tf@c3",
    "Spitfaceeee",
    "Sppitface",
    "Sppittface",
    "Spitttface",
    "Spitface_TheOne",
    "Spitface2024",
    "SpitfaceEmpire",
    "Spitface_VIP",
    "SpitfaceMVP",
    "Spitface_Legendary",
    "RealSpitface",
    "OfficialSpitface",
    "Spitface_Real",
    "SpitfaceAdmin",
    "Spitface_Supreme",
    "SpitfaceElite",
    "SpitfacePrime",
    "SpitfaceAlpha",
    "SpitfaceSigma",
    "SpitfaceWarrior",
    "Spitface_Unstoppable",
    "SpitfaceTheGOAT",
    "SpitfaceChampion",
    "SpitfaceRuler",
    "SpitfaceGodMode",
    "SpitfaceInfinite",
    "Spitface4Ever",
    "SpitfaceBattl3s",
    "Sp1tfaceBattles",
    "Sp!tfaceBattles",
    "5pitfaceBattles",
    "SpitfaceB@ttles",
    "Sp!t.f@ce_B@ttles",
    "Spitface-Battlez",
    "Spitface_Battlezz",
    "SpitfaceWarzone",
    "SpitfaceBattleGrounds",
    "Spitface_BattleMode",
    "SpitfaceBattleMaster",
    "SpitfaceBattlesChampion",
    "SpitfaceBattlesKing",
    "SpitfaceBattles_Legend",
    "SpitfaceBattles_Supreme",
    "SpitfaceBattles_Boss",
    "SpitfaceBattles_Elite",
    "SpitfaceBattles_TheGreat",
    "SpitfaceBattlesHero",
    "SpitfaceBattlesSavage",
    "SpitfaceBattlesDominator",
    "SpitfaceBattlesGladiator",
    "SpitfaceBattlesWarrior",
    "SpitfaceBattles_Unmatched",
    "SpitfaceBattlesRuler",
    "SpitfaceBattlesGOAT",
    "SpitfaceBattlesInfinity",
    "SpitfaceBattlesMVP",
    "SpitfaceBattlesPrime"
];

export default restrictedUsernames;