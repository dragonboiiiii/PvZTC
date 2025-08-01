oS.Init(
	{
		PName: [oPeashooter, oSunFlower],
		ZName: [oZombie, oZombie2, oZombie3],
		PicArr: (function () {
			var a = oCherryBomb.prototype,
				b = a.PicArr;
			return [
				"images/interface/SodRollCap.png",
				"images/interface/SodRoll.png",
				"images/interface/background1unsodded2.jpg",
				"images/interface/background1unsodded_1.jpg",
				b[a.CardGif],
				b[a.NormalGif],
			];
		})(),
		backgroundImage: "images/interface/background1unsodded_1.jpg",
		LF: [0, 0, 1, 1, 1, 0],
		CanSelectCard: 0,
		LevelName: "Recruit training 2",
		LvlEName: 2,
		AudioArr: ["dirt_rise"],
		LargeWaveFlag: { 6: $("imgFlag1") },
		InitLawnMower: function () {
			var a = 5;
			while (--a > 1) {
				CustomSpecial(oLawnCleaner, a, -1);
			}
		},
		StartGame: function () {
			NewImg(
				"imgSF",
				"images/interface/tiaoguo.png",
				"left:1px;top:150px",
				EDAll,
				{
					onclick: function () {
						SelectModal(3);
					},
				}
			);
			NewEle(
				"sod3row",
				"div",
				"position:absolute;left:-115px;top:0;height:600px;width:264px;z-index:0;background:url(images/interface/background1unsodded2.jpg);over-flow:hidden",
				0,
				EDPZ
			);
			NewImg(
				"SodRoll_1",
				"images/interface/SodRoll.png",
				"left:136px;top:128px;z-index:1",
				EDPZ
			);
			NewImg(
				"SodRollCap_1",
				"images/interface/SodRollCap.png",
				"left:131px;top:211px;z-index:1",
				EDPZ
			);
			NewImg(
				"SodRoll_2",
				"images/interface/SodRoll.png",
				"left:136px;top:348px;z-index:1",
				EDPZ
			);
			NewImg(
				"SodRollCap_2",
				"images/interface/SodRollCap.png",
				"left:131px;top:431px;z-index:1",
				EDPZ
			);
			PlayAudio("dirt_rise");
			(function (e, h, b, d, c, g, a, f) {
				e += 15;
				h += 16;
				d += 16;
				$("sod3row").style.width = e + "px";
				SetStyle($("SodRoll_1"), {
					left: h + "px",
					width: --b + "px",
					height: "141px",
				});
				SetStyle($("SodRoll_2"), {
					left: h + "px",
					width: b + "px",
					height: "141px",
				});
				SetStyle($("SodRollCap_1"), {
					left: d + "px",
					width: --c + "px",
					height: --g + "px",
					top: ++a + "px",
				});
				SetStyle($("SodRollCap_2"), {
					left: d + "px",
					width: c + "px",
					height: g + "px",
					top: ++f + "px",
				});
				e < 990
					? oSym.addTask(3, arguments.callee, [
							e,
							h,
							b,
							d,
							c,
							g,
							a,
							f,
						])
					: (ClearChild(
							$("SodRoll_1"),
							$("SodRoll_2"),
							$("SodRollCap_1"),
							$("SodRollCap_2")
						),
						(function () {
							StopMusic();
							PlayMusic((oS.LoadMusic = oS.StartGameMusic));
							oS.InitLawnMower();
							SetVisible($("dFlagMeter"), $("dTop"));
							PrepareGrowPlants(function () {
								NewEle("DivTeachBar", "div", 0, 0, EDAll);
								oP.Monitor({
									ar: [0],
									f: function (l) {
										var m = oS.C + 1;
										switch (l) {
											case 0:
												innerText(
													$("DivTeachBar"),
													"Sunflowers are an extremely important plant!"
												);
												NewImg(
													"PointerUD",
													"images/interface/PointerUP.gif",
													"top:120px;left:50px",
													EDAll
												);
												oSym.addTask(
													10,
													arguments.callee,
													[++l]
												);
												break;
											case 1:
												var j = oGd.$,
													i;
												for (i in j) {
													if (
														j[i].EName ==
														"oSunFlower"
													) {
														innerText(
															$("DivTeachBar"),
															"Try to plant at least 3 of them!"
														);
														oSym.addTask(
															10,
															arguments.callee,
															[++l]
														).addTask(
															2500,
															function () {
																oP.AddZombiesFlag();
																SetVisible(
																	$(
																		"dFlagMeterContent"
																	)
																);
															},
															[]
														);
														return;
													}
												}
												oSym.addTask(
													10,
													arguments.callee,
													[l]
												);
												break;
											case 2:
												var j = oGd.$,
													i,
													k = 0;
												for (i in j) {
													j[i].EName ==
														"oSunFlower" && ++k;
												}
												k > 1 &&
													(innerHTML(
														$("DivTeachBar"),
														"Planting at least 3 sunflowers improves your<br>chances of surviving a zombie attack!"
													),
													++l);
												oSym.addTask(
													10,
													arguments.callee,
													[l]
												);
												break;
											default:
												var j = oGd.$,
													i,
													k = 0;
												for (i in j) {
													j[i].EName ==
														"oSunFlower" && ++k;
												}
												k > 2
													? (innerHTML(
															$("DivTeachBar"),
															"Planting sunflowers will improve your<br>chances of surviving the zombie attack!"
														),
														SetStyle(
															$("PointerUD"),
															{
																left: "50px",
																top: "60px",
															}
														),
														oSym.addTask(
															500,
															SetNone,
															[
																$("PointerUD"),
																$(
																	"DivTeachBar"
																),
															]
														))
													: oSym.addTask(
															10,
															arguments.callee,
															[3]
														);
										}
										return l;
									},
								});
								BeginCool();
								AutoProduceSun(25);
							});
						})());
			})(283, 122, 68, 117, 73, 71, 211, 431);
		},
	},
	{
		AZ: [
			[oZombie, 6, 1],
			[oZombie2, 2, 1],
			[oZombie3, 1, 1],
		],
		FlagNum: 6,
		FlagToSumNum: { a1: [3, 4], a2: [1, 2, 3] },
		FlagToMonitor: { 5: [ShowFinalWave, 0] },
		FlagToEnd: function () {
			NewImg(
				"imgSF",
				"images/Card/Plants/CherryBomb.png",
				"left:827px;top:220px;clip:rect(auto,auto,60px,auto)",
				EDAll,
				{
					onclick: function () {
						GetNewCard(this, oCherryBomb, 3);
					},
				}
			);
			EditImg($("PointerUD"), 0, "images/interface/PointerDown.gif", {
				left: "836px",
				top: "185px",
				display: "block",
			});
		},
	}
);
